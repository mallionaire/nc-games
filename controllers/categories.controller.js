const { fetchAllCategories } = require('../models/categories.model');

exports.getAllCategories = (req, res, next) => {
  fetchAllCategories()
    .then((categories) => {
      res.send({ categories });
    })
    .catch(next);
};
