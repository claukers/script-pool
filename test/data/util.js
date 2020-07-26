module.exports.MS = {
  R: 1,
  B: 100
}

module.exports.timer = () => {
  let now = new Date().getTime();
  let stopped = false;
  return {
    stop: () => {
      const elapsed = new Date().getTime() - now;
      if (stopped) {
        throw new Error("STOPPED!");
      }
      stopped = true;
      return elapsed;
    }
  }
};
