import {fork, isMaster, Worker} from 'cluster';
import {onScriptData, waitScriptExit} from "./util";
import {CLUSTER_MESSAGE_TYPES} from "./cluster";
import {Serializable} from "child_process";

const modulePath = process.argv[2];

const children: { [pid: string]: ClusterChild } = {};

export class ClusterChild {
  private readonly unExpectedExitListener: any = null;

  constructor(private worker: Worker) {
    worker.on('message', (msg) => {
      process.send({
        CLUSTER_MESSAGE_TYPE: CLUSTER_MESSAGE_TYPES.MSG,
        pid: worker.process.pid,
        msg
      });
    });
    this.unExpectedExitListener = (code) => {
      delete children[worker.process.pid];
      process.send({
        CLUSTER_MESSAGE_TYPE: CLUSTER_MESSAGE_TYPES.UNEXPECTED_EXIT,
        pid: worker.process.pid,
        code,
        exit: true
      });
    };
    worker.process.on('exit', this.unExpectedExitListener);
  }

  public send(msg: Serializable): boolean {
    return this.worker.send(msg);
  }

  public isAlive(): boolean {
    try {
      // check alive
      process.kill(this.worker.process.pid, 0);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async kill(): Promise<number> {
    this.worker.process.removeListener('exit', this.unExpectedExitListener);
    if (this.isAlive()) {
      const exitWait = waitScriptExit(this.worker.process);
      return new Promise(async (resolve, reject) => {
        try {
          this.worker.process.kill("SIGINT");
          await exitWait;
          resolve(0);
        } catch (e) {
          if (e.code) {
            resolve(e.code);
          } else {
            reject(e);
          }
        }
      });
    } else {
      return Promise.resolve(6969);
    }

  }
}

if (isMaster) {
  onScriptData(async (data) => {
    switch (data.CLUSTER_MESSAGE_TYPE) {
      case CLUSTER_MESSAGE_TYPES.FORK:
        try {
          const worker = fork();
          children[worker.process.pid] = new ClusterChild(worker);
          return {
            pid: worker.process.pid
          };
        } catch (e) {
          return {
            err: {
              message: e.message,
              stack: e.stack
            }
          };
        }
      case CLUSTER_MESSAGE_TYPES.KILL:
        const child = children[data.pid];
        if (!child) {
          const e = new Error(`process [${data.pid}] died!`);
          return {
            err: {
              message: e.message,
              stack: e.stack
            }
          };
        } else {
          const code = await child.kill();
          return {
            code
          }
        }
      case CLUSTER_MESSAGE_TYPES.MSG:
        const childMsg = children[data.pid];
        if (!childMsg) {
          const e = new Error(`process [${data.pid}] died!`);
          return {
            err: {
              message: e.message,
              stack: e.stack
            }
          };
        } else {
          childMsg.send(data.msg);
          break;
        }
      default:
        const e = new Error(`bad CLUSTER_MESSAGE_TYPES [${data.CLUSTER_MESSAGE_TYPE}]`);
        return {
          err: {
            message: e.message,
            stack: e.stack
          }
        };
    }
  });
} else {
  require(modulePath);
}
