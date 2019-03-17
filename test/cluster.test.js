const {
  createClusterPool
} = require('../src');
const forkPool = createClusterPool;

require('./simple.js')('cluster', forkPool);
