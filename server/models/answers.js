const db = require('../../database');

module.exports = {
  get: (id, count = 5, page = 1, cb) => {
    const queryString = `SELECT * FROM answers WHERE question_id = ${id} AND reported = false ORDER BY helpful DESC LIMIT ${count};`;

    // const queryString = `SELECT
    // questions.id,
    // questions.body,
    // questions.date_written,
    // questions.asker_name,
    // questions.helpful,
    // questions.reported,
    // jsonb_object_agg(answers.id, jsonb_build_object('id', answers.id,
    // 'body',answers.body,
    // 'date_written',answers.date_written,
    // 'answerer_name',answers.answerer_name,
    // 'helpful',answers.helpful)) AS answers
    // FROM questions, answers
    // WHERE questions.id = 1 AND questions.id = answers.question_id
    // GROUP BY questions.id;`
    db.query(queryString, (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });
  },
  post: ( { question_id, body, name, email }, cb) => {
    const queryString = `INSERT INTO answers
    (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    VALUES
    ($1, $2, CURRENT_TIMESTAMP, $3, $4, false, 0);`
    const arguments = [question_id, body, name, email]
    db.query(queryString, arguments, (err, result) => {
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