const categoriesRouter = require('express').Router();
const {
  getAllCategories,
  postCategory,
} = require('../controllers/categories.controller');
const { handles405s } = require('../errors/errors');

categoriesRouter
  .route('/')
  .get(getAllCategories)
  .post(postCategory)
  .all(handles405s);

module.exports = categoriesRouter;
