const {
  getReviewById,
  patchVotes,
} = require('../controllers/reviews.controller');
const {
  postComment,
  getCommentsByReviewId,
} = require('../controllers/comments.controller');

const reviewsRouter = require('express').Router();

reviewsRouter.route('/:review_id').get(getReviewById).patch(patchVotes);
reviewsRouter
  .route('/:review_id/comments')
  .post(postComment)
  .get(getCommentsByReviewId);

module.exports = reviewsRouter;
