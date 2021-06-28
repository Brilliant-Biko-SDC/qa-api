const db = require('../../database');

module.exports = {
  get: (id, count, page, cb) => {
    const queryString = `SELECT * FROM answers WHERE question_id = ${id} AND reported = false ORDER BY helpful DESC LIMIT ${count}`;
    db.query(queryString, (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
  post: ({ question_id, body, name, email }, cb) => {
    const queryString = `INSERT INTO answers
    (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    VALUES
    (${question_id}, ${body}, CURRENT_TIMESTAMP, ${name}, ${email}, false, 0);`
    db.query(queryString, (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
  helpful: (params, cb) => {
    const queryString = `UPDATE answers SET helpful = helpful + 1 WHERE id = ${params.answer_id};`;
    db.query(queryString, (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
  report: (params, cb) => {
    const queryString = `UPDATE answers SET reported = true WHERE id = ${params.answer_id};`;
    db.query(queryString, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
};