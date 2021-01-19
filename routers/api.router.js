const apiRouter = require('express').Router();

const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const reviewsRouter = require('./reviews.router')

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/reviews', reviewsRouter)
module.exports = apiRouter;
