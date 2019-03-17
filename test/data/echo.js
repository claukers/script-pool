process.on('message', (msg) => {
  setTimeout(() => {
    process.send(msg);
  }, Math.ceil(Math.random() * 100) + 1);
});
