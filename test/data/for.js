const os = require('os');

process.on('message', (msg) => {
  let val = 0;
  const iterations = 2 * os.cpus().length;
  for (let r = 0; r < iterations; r++) {
    let pos = r % 2 === 0 ? 1 : -1;
    for (let x = 0; x < iterations; x++) {
      pos = x % 2 === 0 ? 1 : -1;
      for (let j = 0; j < iterations; j++) {
        pos = j % 2 === 0 ? 1 : -1;
        for (let i = 0; i < iterations; i++) {
          pos = i % 2 === 0 ? 1 : -1;
          val += pos * Math.sin(msg.i + new Date().getSeconds());
        }
      }
    }
  }
  msg.i = Math.pow(msg.i, val + msg.i);
  // console.log(msg.i);

  // msg.max = max;
  // setTimeout(() => {
  //console.log(`took ${new Date().getTime()-now}ms`);
  process.send(msg);
  // }, 100);
});
