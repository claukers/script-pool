const {onScriptData} = require("./../../dist");

const {MS} = require("./util");

onScriptData(async (msg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(msg);
    }, Math.ceil(Math.random() * MS.R) + MS.B);
  });
});
