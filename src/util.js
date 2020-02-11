module.exports.setupAutoRestart = async (pool, timeout, internalCall = false) => {
  if (!internalCall && pool.workerRestartTimeout !== undefined) {
    throw new Error(`setupAutoRestart already called on this pool`);
  }
  pool.workerRestartTimeout = null;
  const instances = [];
  for (let node = 0; node < pool._config.min; node++) {
    const instance = await pool.acquire();
    instances.push(instance);
    instance.once("exit", (code) => {
      if (!pool.workerRestartTimeoutCancel) {
        clearTimeout(pool.workerRestartTimeout);
        pool.workerRestartTimeout = setTimeout(async () => {
          if (!pool.workerRestartTimeoutCancel) {
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

module.exports.cancelAutoRestart = async (pool) => {
  if (pool.workerRestartTimeout === undefined) {
    throw new Error(`setupAutoRestart not called on this pool`);
  }
  pool.workerRestartTimeoutCancel = true;
  return pool;
};
