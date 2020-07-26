const {MS} = require("./util");
try {
  process.on('message', (msg) => {
    try {
      setTimeout(() => {
        try {
          process.send(msg);
        } catch (e) {
          console.error("WHAT THE COW?");
        }
      }, Math.ceil(Math.random() * MS.R) + MS.B);
    } catch (e) {
      console.error("WHAT THE WOLF?");
    }
  });
} catch (e) {
  console.error("WHAT THE SHEEP?");
}
