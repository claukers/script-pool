setTimeout(() => {
  console.log("process.exit(1) " + process.pid);
  process.exit(1);
}, 1000);
