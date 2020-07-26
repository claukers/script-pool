import {ChildProcess, fork} from "child_process";
import {EventEmitter} from "events";
import {v4} from "uuid";
import {ClusterWorker, SendInterface} from "./cluster";
import {Pool} from "generic-pool";
import {inspect} from "util";

export const setupAutoRestart = async (pool: Pool<ChildProcess | ClusterWorker>, timeout: number, internalCall = false): Promise<Pool<ChildProcess | ClusterWorker>> => {
  if (!internalCall && (pool as any).workerRestartTimeout !== undefined) {
    throw new Error(`setupAutoRestart already called on this pool`);
  }
  (pool as any).workerRestartTimeout = null;
  const instances = [];
  for (let node = 0; node < (pool as any)._config.min; node++) {
    const instance = await pool.acquire();
    instances.push(instance);
    instance.once("exit", () => {
      if (!(pool as any).workerRestartTimeoutCancel) {
        clearTimeout((pool as any).workerRestartTimeout);
        (pool as any).workerRestartTimeout = setTimeout(async () => {
          if (!(pool as any).workerRestartTimeoutCancel) {
            // noinspection SpellCheckingInspection
            await module.exports.setupAutoRestart(pool, timeout, true);
          }
        }, timeout);
      }
    });
  }
  for (const instance of instances) {
    await pool.release(instance);
  }
  return pool;
};

export const cancelAutoRestart = async (pool: Pool<ClusterWorker | ChildProcess>): Promise<Pool<ChildProcess | ClusterWorker>> => {
  if ((pool as any).workerRestartTimeout === undefined) {
    throw new Error(`setupAutoRestart not called on this pool`);
  }
  (pool as any).workerRestartTimeoutCancel = true;
  return pool;
};

export interface CallScriptArgs {
  modulePath: string;
  timeoutMS: number;
  noKillOnError?: boolean;
  noExitWait?: boolean;
  args?: string[];
  data?: { [key: string]: string };
  env?: { [key: string]: string };
}

export interface ScheduleCallScriptOptions extends CallScriptArgs {
  immediate?: boolean;
  intervalMS: number;
}

export interface Cancelable {
  cancel: () => Promise<void>;
}

export class CancelableEventEmitter extends EventEmitter implements Cancelable {
  constructor() {
    super();
  }

  public async cancel(): Promise<void> {
    this.emit("cancel");
  }
}


export type OnScriptDataOptions = (data: any) => Promise<any | void>

export interface DataMap {
  [key: string]: string | number | boolean | DataMap
}

export interface SendScriptDataOptions {
  child: ChildProcess | SendInterface;
  data?: DataMap;
}

export interface WaitScriptResponseOptions extends SendScriptDataOptions {
  timeoutMS: number;
}

export const onScriptData = (cb: OnScriptDataOptions): CancelableEventEmitter => {
  const emitter = new CancelableEventEmitter();
  const msgListener = (msg) => {
    try {
      const {uuid, ...msgData} = msg;
      if (typeof uuid === "undefined" || typeof uuid !== "string") {
        emitter.emit("error", new Error("invalid msg.uuid!"));
      } else {
        cb(msgData).then((ret) => {
          const retMsg = ret ? {
            uuid,
            ...ret
          } : {uuid};
          try {
            process.send(retMsg);
          } catch (e2) {
            emitter.emit("error", e2);
          }
        }).catch((e) => {
          emitter.emit("error", e);
        });
      }
    } catch (e) {
      emitter.emit("error", e);
    }
  };
  emitter.once("cancel", () => {
    process.removeListener("message", msgListener);
  });
  process.on("message", msgListener);
  return emitter;
};

export const onceScriptData = (cb: OnScriptDataOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const msgListener = (msg) => {
      try {
        const {uuid, ...msgData} = msg;
        if (typeof uuid === "undefined" || typeof uuid !== "string") {
          reject(new Error("invalid msg.uuid!"));
        } else {
          cb(msgData).then((ret) => {
            const retMsg = ret ? {
              uuid,
              ...ret
            } : {uuid};
            try {
              process.send(retMsg);
              resolve();
            } catch (e2) {
              reject(e2);
            }
          }).catch((e) => {
            reject(e);
          });
        }
      } catch (e) {
        reject(e);
      }
    };
    process.once("message", msgListener);
  });
};

export const sendScriptData = ({child, data}: SendScriptDataOptions): Promise<string> => {
  const messageUuid = v4();
  return new Promise<string>((resolve, reject) => {
    try {
      if (data !== null && data !== undefined && typeof data.uuid !== "undefined") {
        reject(new Error("data cannot contain a key called uuid! invalid data.uuid."));
      } else {
        child.send(data ? {
          uuid: messageUuid,
          ...data
        } : {uuid: messageUuid});
        resolve(messageUuid);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const waitScriptResponse = ({child, timeoutMS, data}: WaitScriptResponseOptions): Promise<any | void> => {
  return new Promise<any | void>(async (resolve, reject) => {
    const messageListener = (msg) => {
      try {
        const {uuid, ...rest} = msg;
        if (uuid === messageUuid) {
          clearTimeout(timeout);
          child.removeListener("message", messageListener);
          resolve(rest);
        }
      } catch (e) {
        clearTimeout(timeout);
        child.removeListener("message", messageListener);
        reject(e);
      }
    };
    const timeout = setTimeout(() => {
      child.removeListener("message", messageListener);
      reject(new Error("timeout"));
    }, timeoutMS);
    child.on("message", messageListener);
    const messageUuid = await sendScriptData({child, data});
  });
};

export const waitScriptExit = (child: ChildProcess): Promise<void> => {
  const err = new Error(`exit with code`);
  return new Promise((resolve, reject) => {
    child.once("exit", (code) => {
      if (code) {
        //const err = new Error(`exit with code [${code}]`);
        (err as any).code = `${code}\n${inspect(child)}\n${err.stack}`;
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export const callScript = async ({modulePath, timeoutMS, noKillOnError, noExitWait, args, data, env}: CallScriptArgs): Promise<any> => {
  const child = fork(modulePath, args, {
    env
  });
  const timeout = setTimeout(() => {
    throw new Error("timeout");
  }, timeoutMS);
  const exitWait: Promise<void> = noExitWait ? null : waitScriptExit(child);
  try {
    const messageWait = waitScriptResponse({child, timeoutMS, data});
    const msg = await messageWait;
    await (exitWait ? Promise.resolve() : exitWait);
    clearTimeout(timeout);
    return msg;
  } catch (e) {
    if (!noKillOnError) {
      child.kill('SIGINT');
    }
    await (exitWait ? Promise.resolve() : exitWait);
    clearTimeout(timeout);
    throw e;
  }
};
