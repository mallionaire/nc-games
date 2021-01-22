const {
  fetchAllCategories,
  addCategory,
} = require('../models/categories.model');

exports.getAllCategories = (req, res, next) => {
  fetchAllCategories()
    .then((categories) => {
      res.send({ categories });
    })
    .catch(next);
};

exports.postCategory = (req, res, next) => {
  const { body } = req;

  addCategory(body)
    .then(([category]) => {
      res.status(201).send({ category });
    })
    .catch(next);
};
