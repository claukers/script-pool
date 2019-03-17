const cluster = require('cluster');

const modulePath = process.argv[2];

if (cluster.isMaster) {
  const childs = {};
  process.on('message', (msg) => {
    const msgId = msg.msgId;
    try {
      if (msg.fork) {
        try {
          const cp = cluster.fork();
          childs[cp.process.pid] = cp;
          cp.on('message', (msg) => {
            process.send({
              pid: cp.process.pid,
              childMsg: true,
              msg
            });
          });
          cp.on('exit', (code) => {
            delete childs[cp.process.pid];
          });
          process.send({
            msgId,
            fork: true,
            pid: cp.process.pid
          });
        } catch (e) {
          console.error(e);
          process.send({
            msgId,
            fork: true,
            err: {
              message: e.message,
              stack: e.stack
            }
          });
        }
      } else if (msg.exit) {
        if (!childs[msg.pid]) {
          throw new Error(`process [${msg.pid}] died!`);
        }
        const cp = childs[msg.pid];
        cp.once('exit', (code) => {
          process.send({
            msgId,
            exit: true
          });
        });
        cp.kill('SIGINT');
      } else {
        if (!childs[msg.pid]) {
          throw new Error(`process [${msg.pid}] died!`);
        }
        const cp = childs[msg.pid];
        cp.send(msg.msg);

      }
    } catch (e) {
      console.error(e);
      process.send({
        msgId,
        err: {
          message: e.message,
          stack: e.stack
        }
      });
    }
  });
} else {
  require(modulePath);
}
