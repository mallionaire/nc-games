const {
  addComment,
  fetchComments,
  updateCommentVotes,
  removeComment,
} = require('../models/comments.model');
const { fetchReviewById } = require('../models/reviews.model');

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { body } = req;

  addComment(review_id, body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const { sort_by, order } = req.query;

  const reviewExists = fetchReviewById(review_id);
  const allComments = fetchComments(review_id, sort_by, order);

  Promise.all([allComments, reviewExists])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateCommentVotes(comment_id, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
