const db = require('../../database');

module.exports = {
  get: (product_id, count, page, cb) => {
    const queryString = `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false LIMIT ${count};`;
    db.query(queryString, (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
  post: ({ product_id, body, name, email }, cb) => {
    const queryString = `INSERT INTO questions
    (product_id, body, date_written, asker_name, asker_email, reported, helpful)
    VALUES
    (${product_id}, ${body}, CURRENT_TIMESTAMP, ${name}, ${email}, false, 0);`;
    db.query(queryString, (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
  helpful: (params, cb) => {
    const queryString = `UPDATE questions SET helpful = helpful + 1 WHERE id = ${params.question_id};`;
    db.query(queryString, (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
  report: (params, cb) => {
    const queryString = `UPDATE questions SET reported = true WHERE id = ${params.question_id};`;
    db.query(queryString, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
};