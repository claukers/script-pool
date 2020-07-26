const os = require('os');
process.on("message", (msg) => {
  let val = 0;
  const iterations = Math.ceil((os.cpus().length * os.cpus().length) / 3);
  for (let r = 0; r < iterations; r++) {
    let pos = r % 2;
    for (let x = 0; x < iterations; x++) {
      pos = x % r;
      for (let j = 0; j < iterations; j++) {
        pos = j % x;
        for (let i = 0; i < iterations; i++) {
          pos = i % j;
          val += pos * Math.sin(msg.i + new Date().getSeconds());
        }
      }
    }
  }
  msg.i = Math.pow(msg.i, val + msg.i);
  process.send(msg);
});
