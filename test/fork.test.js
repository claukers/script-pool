const {
  createForkPool
} = require('../src');
const forkPool = createForkPool;

require('./simple.js')('fork', forkPool);
