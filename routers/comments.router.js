const {
  patchComment,
  deleteComment,
} = require('../controllers/comments.controller');

const commentsRouter = require('express').Router();

commentsRouter
  .route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all(handles405s);

module.exports = commentsRouter;
