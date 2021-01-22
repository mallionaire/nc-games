const connection = require('../db/connection');


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

};

exports.updateCommentVotes = (comment_id, votes) => {
  
  return connection('comments')
    .where('comment_id', comment_id)
    .increment('votes', votes || 0)
    .returning('*')
    .then((comment) => {
      if (!comment.length) {
        return Promise.reject({ status: 404, msg: 'Sorry, not found' });
      } else {
        return comment;
      }
    });
};

exports.removeComment = (comment_id) => {
  return connection('comments').where('comment_id', comment_id).del();
};
