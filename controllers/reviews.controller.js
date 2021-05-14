const {
  fetchReviewById,
  updateVotes,
  fetchAllReviews,
  addReview,
} = require('../models/reviews.model');

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then(([review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;

  updateVotes(review_id, inc_votes)
    .then(([review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getAllReviews = (req, res, next) => {
  fetchAllReviews(req.query)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.postReview = (req, res, next) => {
  const review = req.body;
  addReview(review)
    .then(([review]) => {
      res.status(201).send({ review });
    })
    .catch(next);
};
