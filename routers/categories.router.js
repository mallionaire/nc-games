const { request } = require('express');

const categoriesRouter = require('express').Router();
//const categoriesRouter = express.Router();
const { getAllCategories } = require('../controllers/categories.controller');
const { handles405s } = require('../errors/errors');

categoriesRouter.route('/').get(getAllCategories).all(handles405s);

module.exports = categoriesRouter;
