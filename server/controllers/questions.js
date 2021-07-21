const models = require('../models');

module.exports = {
  get: (req, res) => {
    const product_id = req.query.product_id;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    models.questions.get(product_id, count, page, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const formattedData = {
          product_id: product_id,
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
        res.send(data);
      }
    });
  },
  report: (req, res) => {
    model.questions.report(req.params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(data);
      }
    });
  },
};