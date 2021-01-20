const connection = require('../db/connection');
const { addComment, fetchComments } = require('../models/comments.model');

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

  fetchComments(review_id, sort_by, order).then((comments) => {
    res.status(200).send({ comments });
  });
};
