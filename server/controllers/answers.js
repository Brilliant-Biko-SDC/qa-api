const models = require('../models');

module.exports = {
  get: (req, res) => {
    const question_id = req.params.questionid;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    models.answers.get(question_id, count, page, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const formattedData = {
          question_id: question_id,
          results: data.rows
        }
        res.send(formattedData);
      };
    });
  },
  post: (req, res) => {
    models.answers.post(req.body, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).send(data);
      };
    });
  },
  helpful: (req, res) => {
    models.answers.helpful(req.params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(data);
      }
    });
  },
  report: (req, res) => {
    model.answers.report(req.params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(data);
      }
    });
  },
};

