import {ChildProcess, fork, ForkOptions} from 'child_process';
import {createPool, Factory, Options, Pool} from "generic-pool";

export const createForkPool = (opts: Options, modulePath: string, args?: string[], options?: ForkOptions): Pool<ChildProcess> => {
  const factory: Factory<ChildProcess> = {
    create: () => {
      return new Promise((resolve, reject) => {
        try {
          const instance = fork(modulePath, args, options);
          instance.once('exit', (code) => {
            (instance as any).__terminated = true;
            if (code) {
              console.log(`process [${instance.pid}] exited with [${code}]`);
            }
          });
          resolve(instance);
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    },
    destroy: (instance) => {
      return new Promise((resolve, reject) => {
        try {
          if ((instance as any).__terminated === undefined) {
            instance.once('exit', () => {
              resolve();
            });
            instance.kill('SIGINT');
          } else {
            resolve();
          }
        } catch (e) {
          console.error(e);
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
  return createPool<ChildProcess>(factory, opts);
};
