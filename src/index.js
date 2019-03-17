const genericPool = require("generic-pool");
const {
  fork
} = require('child_process');
const {
  EventEmitter
} = require('events');
const path = require('path');

module.exports.createForkPool = (opts, modulePath, args, options) => {
  const factory = {
    create: () => {
      return new Promise((resolve, reject) => {
        try {
          const instance = fork(modulePath, args, options);
          instance.once('exit', (code) => {
            // console.log(`process [${instance.pid}] exited with [${code}]`);
          });
          if (opts.initMsg) {
            instance.send(opts.initMsg);
          }
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
          if (instance.__terminated === undefined) {
            instance.once('exit', (code) => {
              resolve();
            });
            // console.log(`destroy [${instance.pid}]`);
            instance.kill('SIGINT');
          } else {
            resolve()
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
          resolve();
        } catch (e) {
          resolve(false);
        }
      });
    }
  };
  return genericPool.createPool(factory, opts);
};

module.exports.createClusterPool = (opts, modulePath, args) => {
  args = args ? args : [];
  const clusterInstance = fork(path.resolve(__dirname, 'cluster.js'), [modulePath].concat(args));
  const waiting = {};
  const childs = {};
  clusterInstance.on('message', (msg) => {
    const msgId = msg.msgId;
    if (msg.childMsg) {
      childs[msg.pid].emit('message', msg.msg);
    } else if (waiting[msgId]) {
      try {
        if (msg.err) {
          const err = new Error(msg.err.message);
          err.stack = msg.err.stack;
          waiting[msgId].reject(err);
        } else if (msg.exit) {
          waiting[msgId].resolve();
        } else if (msg.fork) {
          childs[msg.pid] = new EventEmitter();
          childs[msg.pid].pid = msg.pid;
          let internalMsgCount = 0;
          childs[msg.pid].send = (m) => {
            internalMsgCount++;
            clusterInstance.send({
              fork: false,
              msgId,
              internalMsgCount,
              pid: msg.pid,
              msg: m
            });
          };
          waiting[msgId].resolve(childs[msg.pid]);
        }
      } catch (e) {
        console.error(e);
        waiting[msgId].reject(e);
      }
      delete waiting[msgId];
    }
  });
  let msgId = 0;
  const factory = {
    create: () => {
      return new Promise((resolve, reject) => {
        try {
          msgId++;
          waiting[msgId] = {
            resolve,
            reject
          };
          clusterInstance.send({
            msgId,
            fork: true
          });
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    },
    destroy: (instance) => {
      return new Promise((resolve, reject) => {
        try {
          msgId++;
          waiting[msgId] = {
            resolve,
            reject
          };
          clusterInstance.send({
            msgId,
            exit: true,
            pid: instance.pid
          });
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
          resolve();
        } catch (e) {
          resolve(false);
        }
      });
    }
  };
  const pool = genericPool.createPool(factory, opts);
  const oldClear = pool.clear;
  pool.clear = async () => {
    await oldClear.apply(pool);
    await new Promise((resolve) => {
      clusterInstance.once('exit', () => {
        resolve();
      });
      clusterInstance.kill('SIGINT');
    });
  };
  return pool;
};
