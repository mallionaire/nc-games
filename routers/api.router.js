const apiRouter = require('express').Router();

const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const reviewsRouter = require('./reviews.router');
const commentsRouter = require('./comments.router');
const { handles405s } = require('../errors/errors');

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.route('/').all(handles405s);
module.exports = apiRouter;
