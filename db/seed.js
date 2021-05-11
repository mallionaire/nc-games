const format = require('pg-format');
const { formatDates, makeRefObj, formatComments } = require('../utils/utils');
const db = require('./connection');
const { dropTables, createTables } = require('./manage-tables');

const seed = async ({
  categoriesData,
  usersData,
  reviewsData,
  commentsData,
}) => {
  await dropTables();
  await createTables();

  const insertCategoriesQueryStr = format(
    'INSERT INTO categories (slug, description) VALUES %L RETURNING *;',
    categoriesData.map(({ slug, description }) => [slug, description])
  );
  const categoriesPromise = db
    .query(insertCategoriesQueryStr)
    .then((result) => result.rows);

  const insertUsersQueryStr = format(
    'INSERT INTO users ( username, name, avatar_url) VALUES %L RETURNING *;',
    usersData.map(({ username, name, avatar_url }) => [
      username,
      name,
      avatar_url,
    ])
  );
  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((result) => result.rows);

  await Promise.all([categoriesPromise, usersPromise]);

  const formattedReviewData = formatDates(reviewsData);
  const insertReviewsQueryStr = format(
    'INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at, votes) VALUES %L RETURNING *;',
    formattedReviewData.map(
      ({
        title,
        designer,
        owner,
        review_img_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIOGtX3NcbceZH7JaDO7BNZeC-EyDg1JUk4A&usqp=CAU',
        review_body,
        category,
        created_at,
        votes = 0,
      }) => [
        title,
        designer,
        owner,
        review_img_url,
        review_body,
        category,
        created_at,
        votes,
      ]
    )
  );

  const reviewRows = await db
    .query(insertReviewsQueryStr)
    .then((result) => result.rows);

  const reviewIdLookup = makeRefObj(reviewRows);
  const formattedCommentData = formatComments(commentsData, reviewIdLookup);
  const insertCommentsQueryStr = format(
    'INSERT INTO comments (body, author, review_id, votes, created_at) VALUES %L RETURNING *;',
    formattedCommentData.map(
      ({ body, author, review_id, votes = 0, created_at }) => [
        body,
        author,
        review_id,
        votes,
        created_at,
      ]
    )
  );
  return db.query(insertCommentsQueryStr).then((result) => result.rows);
};

module.exports = seed;
