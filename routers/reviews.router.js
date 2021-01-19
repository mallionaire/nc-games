const {
  getReviewById,
  patchVotes,
} = require("../controllers/reviews.controller");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchVotes);

module.exports = reviewsRouter;
