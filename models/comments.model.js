const connection = require('../db/connection');
const { checkReviewExists } = require('./reviews.model');

exports.addComment = (review_id, { body, username }) => {
  return connection('comments')
    .insert({ body, author: username, review_id })
    .returning('*');
};

exports.fetchComments = (review_id, sort_by = 'created_at', order = 'desc') => {
  return connection('comments')
    .select('*')
    .where('review_id', review_id)
    .orderBy(sort_by, order);
  // .then((comments) => {
  //   if (!comments.length) {
  //     const reviewExists = checkReviewExists(review_id, sort_by);
  //     return Promise.all([comments, reviewExists]);
  //   } else {
  //     return [comments];
  //   }
  // });
};
