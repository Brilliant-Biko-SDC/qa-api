const { Pool } = require('pg');
const { config } = require('./config.js')

const pool = new Pool(config);

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// })

pool.connect((err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database');
  }
});


module.exports = pool;

