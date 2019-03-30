const cluster = require('cluster');

const modulePath = process.argv[2];

if (cluster.isMaster) {
  const childs = {};
  process.on('message', (msg) => {
    const msgId = msg.msgId;

    const forkHandler = () => {
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
          process.send({
            pid: cp.process.pid,
            code,
            exit: true
          });
        });
        process.send({
          msgId,
          fork: true,
          pid: cp.process.pid
        });
      } catch (e) {
        // console.error(e);
        process.send({
          msgId,
          fork: true,
          err: {
            message: e.message,
            stack: e.stack
          }
        });
      }
    };

    const exitHandler = () => {
      if (!childs[msg.pid]) {
        throw new Error(`process [${msg.pid}] died!`);
      }
      const cp = childs[msg.pid];
      cp.once('exit', (code) => {
        process.send({
          msgId,
          pid: msg.pid,
          code,
          exit: true
        });
      });
      cp.kill('SIGINT');
    };

    try {
      if (msg.fork) {
        forkHandler();
      } else if (msg.exit) {
        exitHandler();
      } else {
        if (!childs[msg.pid]) {
          throw new Error(`process [${msg.pid}] died!`);
        }
        const cp = childs[msg.pid];
        cp.send(msg.msg);

      }
    } catch (e) {
      // console.error(e);
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
