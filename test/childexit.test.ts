import {describe, it} from 'mocha';

import {resolve} from 'path';
import {strictEqual} from "assert";


describe('child exit', function () {
  this.timeout(1000000);

  const {
    createClusterPool,
    createForkPool
  } = require('../src');
  [{mode: "cluster", create: createClusterPool}, {mode: "fork", create: createForkPool}].forEach((testCase) => {
    it(testCase.mode + ' child exit 1 with testOnBorrow false and draining with alive dead worker should return a dead worker and emit exit', (done: (value: void) => void | PromiseLike<void>) => {
      const test = async () => {
        const min = 1;
        const max = 1;
        const autostart = false;
        const modulePath = 'exit1.js'
        const pool = testCase.create({
          min,
          max,
          testOnBorrow: false,
          autostart,
        }, resolve(__dirname, 'data', modulePath));
        await pool.start();
        let instance = await pool.acquire();
        const pid = instance.pid;
        console.log(pid);
        let dead = false;
        instance.once("exit", (code: null | string) => {
          console.log("dead");
          dead = true;
        });
        await pool.release(instance);
        await new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              instance = await pool.acquire();
              console.log(instance.pid);
              strictEqual(instance.pid, pid);
              strictEqual(dead, true);
              try {
                process.kill(instance.pid, 0);
                reject(new Error("bad state should be dead!"));
              } catch (e) {
                try {
                  console.error(e.message);
                  strictEqual(e.message, "kill ESRCH");
                  await pool.release(instance);
                  await pool.drain();
                  await pool.clear();
                  resolve();
                } catch (e) {
                  console.error(e);
                  reject(e);
                }
              }
            } catch (e) {
              console.error(e);
              await pool.drain();
              await pool.clear();
              reject(e);
            }
          }, 5000);
        });
      };
      test().then(done).catch(done);
    });
    it(testCase.mode + ' child exit 1 with testOnBorrow true and draining with alive dead worker should return a alive worker and emit exit', (done: (value: void) => void | PromiseLike<void>) => {
      const test = async () => {
        const min = 1;
        const max = 1;
        const autostart = false;
        const modulePath = 'exit1.js'
        const pool = testCase.create({
          min,
          max,
          testOnBorrow: true,
          autostart,
        }, resolve(__dirname, 'data', modulePath));
        await pool.start();
        let instance = await pool.acquire();
        let dead = false;
        instance.once("exit", (code: null | string) => {
          console.log("dead");
          dead = true;
        });
        const pid = instance.pid;
        console.log(pid);
        await pool.release(instance);
        await new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              instance = await pool.acquire();
              strictEqual(dead, true);
              console.log(instance.pid);
              strictEqual(instance.pid, pid);
              await pool.release(instance);
              await pool.drain();
              await pool.clear();
              console.log("resolving");
              resolve();
            } catch (e) {
              await pool.drain();
              await pool.clear();
              reject(e);
            }
          }, 5000);
        });
      };
      test().then(done).catch(done);
    });
    it(testCase.mode + ' child exit 1 with testOnBorrow true and draining with dead worker should return a alive worker and emit exit', (done: (value: void) => void | PromiseLike<void>) => {
      const test = async () => {
        const min = 1;
        const max = 1;
        const autostart = false;
        const modulePath = 'exit1.js'
        const pool = testCase.create({
          min,
          max,
          testOnBorrow: true,
          autostart,
        }, resolve(__dirname, 'data', modulePath));
        await pool.start();
        let instance = await pool.acquire();
        let dead = false;
        instance.once("exit", (code: null | string) => {
          console.log("dead");
          dead = true;
        });
        const pid = instance.pid;
        console.log(pid);
        await pool.release(instance);
        await new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              instance = await pool.acquire();
              strictEqual(dead, true);
              console.log(instance.pid);
              strictEqual(instance.pid, pid);
              await pool.release(instance);
              setTimeout(async () => {
                await pool.drain();
                await pool.clear();
                console.log("resolving");
                resolve();
              }, 2000);
            } catch (e) {
              await pool.drain();
              await pool.clear();
              reject(e);
            }
          }, 5000);
        });
      };
      test().then(done).catch(done);
    });
  });
});
