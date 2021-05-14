const db = require('../db/connection');
const { validateSortBy, validateOrder } = require('../utils/utils');
const { checkExists } = require('./utils.model');

exports.fetchReviewById = async (review_id) => {
  const queryStr = `SELECT reviews.*, COUNT(comment_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id
  LIMIT 1;`;

  const reviews = await db
    .query(queryStr, [review_id])
    .then((result) => result.rows);

  if (!reviews.length) {
    return Promise.reject({
      status: 404,
      msg: "Sorry, could not find the review you're looking for",
    });
  }
  return reviews;
};

exports.updateVotes = async (review_id, votes = 0) => {
  const reviews = await db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
      [votes, review_id]
    )
    .then((result) => result.rows);

  if (!reviews.length) {
    return Promise.reject({
      status: 404,
      msg: `Sorry, not found`,
    });
  }

  return reviews;
};

exports.fetchAllReviews = async ({
  sort_by = 'created_at',
  order = 'desc',
  category,
  owner,
}) => {
  const validSortBy = await validateSortBy(sort_by, [
    'created_at',
    'votes',
    'title',
    'comment_count',
    'owner',
    'designer',
  ]);
  const validOrder = await validateOrder(order);
  const dbQueryParams = [];

  let queryStr = `SELECT reviews.*,
  COUNT(comments.comment_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
`;

  if (category) {
    dbQueryParams.push(category);
    queryStr += `WHERE reviews.category ILIKE $${dbQueryParams.length}`;
  }

  if (owner) {
    dbQueryParams.push(owner);
    queryStr += `${category ? 'AND ' : ''}WHERE reviews.owner ILIKE $${
      dbQueryParams.length
    }`;
  }

  queryStr += `
  GROUP BY reviews.review_id
  ORDER BY ${validSortBy} ${validOrder};
  `;

  const reviews = await db
    .query(queryStr, dbQueryParams)
    .then((result) => result.rows);

  if (!reviews.length) {
    if (category) await checkExists('categories', 'slug', category);
    if (owner) await checkExists('users', 'username', owner);
  }
  return reviews;
};
