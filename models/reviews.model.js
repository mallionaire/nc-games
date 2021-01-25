const { all } = require('../app');
const connection = require('../db/connection');

exports.fetchReviewById = (review_id) => {
  return connection('reviews')
    .select('reviews.*')
    .where('reviews.review_id', review_id)
    .leftJoin('comments', 'reviews.review_id', 'comments.review_id')
    .count('comment_id AS comment_count')
    .groupBy('reviews.review_id')
    .then((review) => {
      if (!review.length) {
        return Promise.reject({
          status: 404,
          msg: "Sorry, could not find the review you're looking for",
        });
      } else return review;
    });
};

exports.updateVotes = (review_id, votes) => {
  return connection('reviews')
    .where('review_id', review_id)
    .increment('votes', votes || 0)
    .returning('*')
    .then((review) => {
      if (!review.length) {
        return Promise.reject({ status: 404, msg: 'Sorry, not found' });
      } else {
        return review;
      }
    });
};

exports.fetchAllReviews = async (
  column,
  order,
  owner,
  category,
  limit,
  offset
) => {
  const allReviews = await connection('reviews')
    .select('reviews.*')
    .leftJoin('comments', 'reviews.review_id', 'comments.review_id')
    .count('comment_id AS comment_count')
    .groupBy('reviews.review_id')
    .orderBy(column || 'created_at', order || 'desc')
    .modify((query) => {
      if (owner) query.where('reviews.owner', owner);
      if (category) query.where('reviews.category', category);
    });

  const paginatedReviews = await connection('reviews')
    .select('reviews.*')
    .leftJoin('comments', 'reviews.review_id', 'comments.review_id')
    .count('comment_id AS comment_count')
    .groupBy('reviews.review_id')
    .orderBy(column || 'created_at', order || 'desc')
    .modify((query) => {
      if (owner) query.where('reviews.owner', owner);
      if (category) query.where('reviews.category', category);
    })
    .limit(limit)
    .offset(offset);

  //console.log(paginatedReviews);
  return [allReviews.length, paginatedReviews];
};

exports.addReview = (review) => {
  return connection('reviews').insert(review).returning('*');
};
