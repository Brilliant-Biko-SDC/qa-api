const db = require('../../database');

module.exports = {
  get: (product_id, count = 5, page = 1, cb) => {
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
    ($1, $2, CURRENT_TIMESTAMP, $3, $4, false, 0);`
    const arguments = [product_id, body, name, email]
    db.query(queryString, arguments, (err, result) => {
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