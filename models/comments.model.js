const db = require('../db/connection');
const { checkExists } = require('./utils.model');

exports.addComment = (review_id, { body, username }) => {
  return db
    .query(
      'INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *;',
      [review_id, username, body]
    )
    .then((result) => result.rows);
};

exports.fetchComments = async (
  review_id,
  sort_by = 'created_at',
  order = 'desc'
) => {
  const isValidSortByColumn = ['created_at', 'votes'].includes(sort_by);
  const lowerCaseOrder = order.toLowerCase();
  const isValidOrder = ['asc', 'desc'].includes(lowerCaseOrder);

  if (!isValidSortByColumn)
    return Promise.reject({ status: 400, msg: 'Invalid sort by query' });
  if (!isValidOrder)
    return Promise.reject({ status: 400, msg: 'Invalid order query' });

  const queryStr = `SELECT * FROM comments WHERE review_id = $1 ORDER BY ${sort_by}
  ${order};`;

  const comments = await db
    .query(queryStr, [review_id])
    .then((result) => result.rows);

  if (!comments.length) {
    await checkExists('reviews', 'review_id', review_id);
  }
  return comments;
};

exports.updateCommentVotes = async (comment_id, inc_votes = 0) => {
  const { rows: comments } = await db.query(
    `UPDATE comments
      SET votes = votes + $1
      WHERE comment_id = $2
      RETURNING *;`,
    [inc_votes, comment_id]
  );

  if (!comments.length) {
    return Promise.reject({ status: 404, msg: 'comment not found' });
  }
  return comments;
};

exports.removeComment = async (comment_id) => {
  const { rowCount: numberOfDeletions } = await db.query(
    `DELETE FROM comments WHERE comment_id = $1;`,
    [comment_id]
  );

  if (!numberOfDeletions) {
    return Promise.reject({ status: 404, msg: 'comment not found' });
  }
};
