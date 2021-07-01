const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { questionid: id } = req.params
    const { count, page } = req.query

    models.answers.get(id, count, page, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const formattedData = {
          question_id: id,
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
        res.status(204).send(data);
      }
    });
  },
  report: (req, res) => {
    model.answers.report(req.params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(204).send(data);
      }
    });
  },
};

