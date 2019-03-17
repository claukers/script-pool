module.exports = (title, forkPool) => {
  const {
    describe,
    it,
    beforeEach
  } = require('mocha');
  const {
    resolve
  } = require('path');
  const {
    expect
  } = require('chai');
  const {
    timer,
    avg
  } = require('./data/util.js');

  const tasks = [10, 20, 30];
  const configs = [{
    min: 8,
    max: 8
  }, {
    min: 1,
    max: 2
  }, {
    min: 2,
    max: 2
  }, {
    min: 2,
    max: 3
  }, {
    min: 3,
    max: 3
  }, {
    min: 3,
    max: 4
  }, {
    min: 4,
    max: 8
  }];


  ['for.js', 'echo.js'].forEach((modulePath) => {
    const describeTitle = `${modulePath} [${title}]`;
    describe(describeTitle, function () {
      this.timeout(1000000);
      let running = false;
      beforeEach(async () => {
        await new Promise((resolve) => {
          const check = () => {
            if (!running) {
              running = true;
              resolve();
            } else {
              setTimeout(check, Math.random() * 500 + 1000);
            }
          };
          check();
        });
      });

      tasks.forEach((jobs) => {
        let best = null;
        let oneOne = null;
        let worst = null;
        const toFinish = Object.keys(configs).length;
        let finished = 0;
        configs.forEach((configData) => {
          const itTitle = `${jobs} jobs (min:${configData.min}, max: ${configData.max})`;
          it(itTitle, async () => {
            try {
              running = true;
              const m = avg();
              const pids = [];
              let received = 0;
              const toSend = jobs;
              const test = async () => {
                const pool = await forkPool({
                  min: configData.min,
                  max: configData.max,
                  autostart: true,
                }, resolve(__dirname, 'data', modulePath));
                await pool.start();
                const msgHandler = (clock, expectedMsg, callback) => {
                  return (msg) => {
                    expect(expectedMsg.text).to.be.equal(msg.text);
                    received++;
                    const took = clock.lap();
                    m.add(took);
                    callback();
                  };
                };
                const allClock = timer();
                for (let i = 0; i < toSend; i++) {
                  const clock = timer();
                  pool.acquire().then((instance) => {
                    const msg = {
                      text: `hola ${i}`,
                      i
                    };
                    if (pids.indexOf(instance.pid) === -1) {
                      pids.push(instance.pid);
                    }
                    instance.once('message', msgHandler(clock, msg, () => {
                      pool.release(instance).catch((e) => {
                        expect(e).to.be.equal(undefined);
                      });
                    }));
                    instance.send(msg);
                  }).catch((e) => {
                    expect(e).to.be.equal(undefined);
                  });
                }
                await pool.drain();
                pids.forEach((pid) => {
                  try {
                    process.kill(pid, 0);
                  } catch (e) {
                    expect(e.message).to.be.equal(undefined);
                  }
                });
                expect(received).to.be.equal(toSend);
                await pool.clear();
                const took = allClock.lap();
                const avg = m.avg();
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
                    expect(true, 'Bad State').to.be.equal(false);
                  } catch (e) {
                    expect(e.message).to.be.equal('kill ESRCH');
                  }
                });
              };
              await test();
              finished++;
              if (toFinish === finished) {
                console.log(`best [${jobs}] jobs for ${describeTitle} is {min: ${best.configData.min}, max: ${best.configData.max}} and took ${best.took}ms avg[${best.avg}]`);
                if (!oneOne) {
                  oneOne = best;
                }
                const diff = oneOne.took - best.took
                console.log(`one on one [${jobs}] jobs for ${describeTitle} is {min: ${oneOne.configData.min}, max: ${oneOne.configData.max}} and took ${oneOne.took}ms gain with best ${diff}ms so ${Math.floor(diff / jobs)}ms per job on avg[${oneOne.avg}]`);
                console.log(`worst [${jobs}] jobs for ${describeTitle} is {min: ${worst.configData.min}, max: ${worst.configData.max}} and took ${worst.took}ms avg[${worst.avg}]`);
                require('fs').writeFileSync(require('path').resolve(__dirname, `${describeTitle}-${jobs}.json`), JSON.stringify({
                  best,
                  oneOne,
                  worst
                }));
                expect(best.configData.max > 1, 'overhead detected!!').to.be.equal(true);
              }
              running = false;
            } catch (e) {
              running = false;
              throw e;
            }
          });
        });
      });
    });
  });
};
