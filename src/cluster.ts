import {ChildProcess, fork, ForkOptions} from 'child_process';
import {EventEmitter} from 'events';
import {resolve as pathResolve} from 'path';
import {sendScriptData, waitScriptExit, waitScriptResponse} from "./util";
import {createPool, Factory, Options, Pool} from "generic-pool";

const clusterInstanceTimeoutMS = 1000 * 60 * 3;

export enum CLUSTER_MESSAGE_TYPES {
  FORK = "FORK",
  KILL = "KILL",
  UNEXPECTED_EXIT = "UNEXPECTED_EXIT",
  MSG = "MSG",
  UNEXPECTED_ERR = "UNEXPECTED_ERR"
}

export interface SendInterface extends EventEmitter {
  send(m: { [key: string]: string | number | boolean }): boolean;
}

export class ClusterWorker extends EventEmitter implements SendInterface {
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  constructor(protected readonly clusterInstance: ChildProcess, public readonly pid: any) {
    super();
  }

  public send(m: { [key: string]: string | number | boolean }): boolean {
    sendScriptData({
      child: this.clusterInstance,
      data: {
        CLUSTER_MESSAGE_TYPE: CLUSTER_MESSAGE_TYPES.MSG,
        pid: this.pid,
        msg: m
      }
    }).catch((e) => {
      this.emit("error", e);
    });
    return true;
  }
}

export const createClusterPool = (opts: Options, modulePath: string, args?: string[], options?: ForkOptions): Pool<ClusterWorker> => {
  args = args ? args : [];
  const clusterInstance = fork(pathResolve(__dirname, 'cluster_instance'), [modulePath].concat(args), options);
  const waitClusterInstanceExit = waitScriptExit(clusterInstance);
  const children: { [pid: string]: ClusterWorker } = {};
  const factory: Factory<ClusterWorker> = {
    create: () => {
      return new Promise((resolve, reject) => {
        try {
          waitScriptResponse({
            child: clusterInstance,
            timeoutMS: clusterInstanceTimeoutMS,
            data: {
              CLUSTER_MESSAGE_TYPE: CLUSTER_MESSAGE_TYPES.FORK
            }
          }).then((data) => {
            try {
              if (data.err) {
                const err = new Error(data.err.message);
                err.stack = data.err.stack;
                reject(err);
              } else {
                const child = new ClusterWorker(clusterInstance, data.pid);
                children[data.pid] = child;
                resolve(child);
              }
            } catch (e) {
              reject(e);
            }
          }).catch((e) => {
            reject(e);
          });
        } catch (e) {
          reject(e);
        }
      });
    },
    destroy: (instance) => {
      return new Promise((resolve, reject) => {
        try {
          waitScriptResponse({
            child: clusterInstance,
            timeoutMS: clusterInstanceTimeoutMS,
            data: {
              CLUSTER_MESSAGE_TYPE: CLUSTER_MESSAGE_TYPES.KILL,
              pid: instance.pid
            }
          }).then((data) => {
            if (data.err) {
              const err = new Error(data.err.message);
              err.stack = data.err.stack;
              reject(err);
            } else {
              const child = children[instance.pid];
              if (data.code) {
                console.log(`process [${instance.pid}] exited with [${data.code}]`);
              }
              if (child) {
                child.emit('exit', data.code);
              }
              delete children[instance.pid];
              resolve();
            }
          }).catch((e) => {
            reject(e);
          });
        } catch (e) {
          reject(e);
        }
      });
    },
    validate: (instance) => {
      return new Promise((resolve) => {
        try {
          process.kill(instance.pid, 0);
          resolve(true);
        } catch (e) {
          resolve(false);
        }
      });
    }
  };
  const pool = createPool(factory, opts);
  const oldClear = pool.clear;
  pool.clear = async () => {
    await oldClear.apply(pool);
    clusterInstance.kill('SIGINT');
    await waitClusterInstanceExit;
  };
  clusterInstance.on('message', (msg: any) => {
    switch (msg.CLUSTER_MESSAGE_TYPE) {
      case CLUSTER_MESSAGE_TYPES.MSG:
        children[msg.pid].emit('message', msg.msg);
        break;
      case CLUSTER_MESSAGE_TYPES.UNEXPECTED_EXIT:
        const child = children[msg.pid];
        console.log(`process [${msg.pid}] exited with unexpected with [${msg.code}]`);
        if (child) {
          child.emit('exit', msg.code);
        }
        delete children[msg.pid];
        break;
      case CLUSTER_MESSAGE_TYPES.UNEXPECTED_ERR:
        const err = new Error(msg.err.message);
        err.stack = msg.err.stack;
        children[msg.pid].emit('error', err);
        break;
    }
  });
  return pool;
};
