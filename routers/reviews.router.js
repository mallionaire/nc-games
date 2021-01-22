const {
  getReviewById,
  patchVotes,
  getAllReviews,
  postReview,
} = require('../controllers/reviews.controller');
const {
  postComment,
  getCommentsByReviewId,
} = require('../controllers/comments.controller');
const { handles405s } = require('../errors/errors');

const reviewsRouter = require('express').Router();

reviewsRouter
  .route('/:review_id')
  .get(getReviewById)
  .patch(patchVotes)
  .all(handles405s);
reviewsRouter
  .route('/:review_id/comments')
  .post(postComment)
  .get(getCommentsByReviewId)
  .all(handles405s);

reviewsRouter.route('/').get(getAllReviews).post(postReview).all(handles405s);

module.exports = reviewsRouter;
