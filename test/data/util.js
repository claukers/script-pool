module.exports.avg = () => {
  let total, count;
  count = 0;
  total = 0;
  return {
    add: (n) => {
      total += n;
      count++;
    },
    avg: () => {
      return total / count;
    }
  }
};

module.exports.timer = () => {
  let now = new Date().getTime();
  return {
    lap: () => {
      const elapsed = new Date().getTime() - now;
      return elapsed;
    }
  }
};
