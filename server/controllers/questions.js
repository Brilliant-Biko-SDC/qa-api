const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id: id, count, page } = req.query

    models.questions.get(id, count, page, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const formattedData = {
          product_id: id,
          results: data.rows
        }
        res.send(formattedData);
      };
    });
  },
  post: (req, res) => {
    models.questions.post(req.body, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).send(data);
      };
    });
  },
  helpful: (req, res) => {
    models.questions.helpful(req.params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(204).send(data);
      }
    });
  },
  report: (req, res) => {
    model.questions.report(req.params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(204).send(data);
      }
    });
  },
};
