import {beforeEach, describe, it} from 'mocha';
import {createClusterPool, createForkPool, waitScriptResponse} from '../src';
import {resolve as pathResolve} from "path";
import {strictEqual} from "assert";

const {MS, timer} = require('./data/util.js');

const simpleTestsTimeoutMS = 999999999;

describe("simple tests", function () {
  this.timeout(simpleTestsTimeoutMS);
  const tasks = [100, 200, 300];
  const configs = [{
    min: 1,
    max: 1
  }, {
    min: 1,
    max: 4
  }, {
    min: 8,
    max: 8
  }];
  ['slow_for.js', 'fancy_slow_echo.js', 'slow_echo.js'].forEach((modulePath) => {
    tasks.forEach((jobs) => {
      const isEcho = modulePath.indexOf("echo") !== -1;
      if (!isEcho && jobs <= 100 || isEcho && jobs >= 100) {
        [
          {
            title: "createClusterPool",
            forkPool: createClusterPool
          },
          {
            title: "createForkPool",
            forkPool: createForkPool
          }
        ].forEach(({forkPool, title}) => {
          const describeTitle = `${modulePath} [${title}] [${jobs}]`;
          describe(describeTitle, function () {
            this.timeout(1000000);
            let running = false;
            beforeEach((done) => {
              (new Promise((resolve) => {
                const check = () => {
                  if (!running) {
                    running = true;
                    resolve();
                  } else {
                    setTimeout(check, Math.random() * 500 + 1000);
                  }
                };
                check();
              })).then(done).catch(done);
            });

            // HERE TASK.forEach WAS (YODA BETTER KNOWS)
            let best: any = null;
            let oneOne: any = null;
            let worst: any = null;
            const toFinish = Object.keys(configs).length;
            let finished = 0;
            configs.forEach((configData) => {
              const itTitle = `${jobs} jobs (min:${configData.min}, max: ${configData.max})`;
              it(itTitle, (done) => {
                (async () => {
                  try {
                    running = true;
                    const pids: number[] = [];
                    let received = 0;
                    const toSend = jobs;
                    await (async () => {
                      const pool = await forkPool({
                        min: configData.min,
                        max: configData.max,
                        autostart: true,
                      }, pathResolve(__dirname, 'data', modulePath), undefined, undefined);
                      await pool.start();
                      let instances: any[] = [];
                      for (let i = 0; i < configData.min; i++) {
                        instances.push(await pool.acquire());
                      }

                      for (const instance of instances) {
                        await pool.release(instance);
                      }
                      instances = [];
                      const allClock = timer();
                      const tR = [];
                      for (let i = 0; i < toSend; i++) {
                        tR.push(new Promise(async (resolve, reject) => {
                          const child = await pool.acquire();
                          try {
                            if (pids.indexOf(child.pid) === -1) {
                              pids.push(child.pid);
                            }
                            const strictEqualedMsg = {
                              text: `hola ${i}`,
                              i: `${i}`
                            };
                            const msg = await waitScriptResponse({
                              child,
                              timeoutMS: simpleTestsTimeoutMS,
                              data: strictEqualedMsg
                            });
                            strictEqual(msg.text, strictEqualedMsg.text);
                            received++;
                            await pool.release(child as any);
                            resolve();
                          } catch (e) {
                            await pool.release(child as any);
                            process.exit(1);
                            reject(e);
                          }
                        }));
                      }
                      await Promise.all(tR);
                      strictEqual(received, toSend);
                      const took = allClock.stop();
                      await pool.drain();
                      pids.forEach((pid) => {
                        try {
                          process.kill(pid, 0);
                        } catch (e) {
                          strictEqual(e.message, undefined);
                        }
                      });
                      await pool.clear();
                      const avg = Math.ceil(took / jobs);
                      if (!best) {
                        best = {
                          configData,
                          took,
                          avg
                        };
                        worst = {
                          configData,
                          took,
                          avg
                        };
                      }
                      if (best.took > took) {
                        best = {
                          configData,
                          took,
                          avg
                        };
                      }
                      if (worst.took < took) {
                        worst = {
                          configData,
                          took,
                          avg
                        };
                      }
                      if (configData.min === 1 && configData.max === 1) {
                        oneOne = {
                          configData,
                          took,
                          avg
                        };
                      }
                      // console.log(`[${itTitle}] avg per job ${m.avg()}ms all took ${took}ms`);
                      pids.forEach((pid) => {
                        try {
                          process.kill(pid, 0);
                          strictEqual(true, false);
                        } catch (e) {
                          strictEqual(e.message, 'kill ESRCH');
                        }
                      });
                    })();

                    finished++;
                    if (toFinish === finished) {

                      console.log(`best [${jobs}] jobs for ${describeTitle} is {min: ${best.configData.min}, max: ${best.configData.max}} and took ${best.took}ms avg ${best.avg}ms ${isEcho ? `so ${best.avg - (MS.B + MS.R)}ms overhead per job` : ""}`);
                      if (!oneOne) {
                        oneOne = best;
                      }
                      const diff = oneOne.took - best.took;
                      const isOneNotWorst = worst.configData.min !== 1 || worst.configData.min !== 1;
                      console.log(`one on one${isOneNotWorst ? "(NOT WORSE!!!)" : ""} [${jobs}] jobs for ${describeTitle} is {min: ${oneOne.configData.min}, max: ${oneOne.configData.max}} and took ${oneOne.took}ms gain with best ${diff}ms so ${Math.floor(diff / jobs)}ms per job on avg ${oneOne.avg}ms ${isEcho ? `so ${oneOne.avg - (MS.B + MS.R)}ms overhead per job` : ""}`);
                      if (isOneNotWorst) {
                        console.log(`worst [${jobs}] jobs for ${describeTitle} is {min: ${worst.configData.min}, max: ${worst.configData.max}} and took ${worst.took}ms avg ${worst.avg}ms ${isEcho ? `so ${worst.avg - (MS.B + MS.R)}ms overhead per job` : ""}`);
                      }

                      /*require('fs').writeFileSync(require('path').resolve(__dirname, "data", "output", `${describeTitle}-${jobs}.json`), JSON.stringify({
                        best,
                        oneOne,
                        worst
                      }));*/
                      strictEqual(best.configData.max > 1, true, "overhead detected!");
                    }
                    running = false;
                  } catch (e) {
                    running = false;
                    throw e;
                  }
                })().then(done).catch(done);
              });
            });
          });
        });
      }
    });
  });
});
