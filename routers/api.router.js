const apiRouter = require('express').Router();

const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
module.exports = apiRouter;
