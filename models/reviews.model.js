const connection = require("../db/connection");

exports.fetchReviewById = (review_id) => {
  return connection("reviews")
    .select("reviews.*")
    .where("reviews.review_id", review_id)
    .leftJoin("comments", "reviews.review_id", "comments.review_id")
    .count("comment_id AS comment_count")
    .groupBy("reviews.review_id")
    .then((review) => {
      if (!review.length) {
        return Promise.reject({
          status: 404,
          msg: "Sorry, could not find the article you're looking for",
        });
      } else return review;
    });
};

exports.updateVotes = (review_id, votes) => {
  return connection("reviews")
    .where("review_id", review_id)
    .increment("votes", votes || 0)
    .returning("*");
};


exports.checkReviewExists = (review_id) => {
  return connection('reviews').where("review_id", review_id).then(review => {
    if(!review.length) {
      return Promise.reject({
        status: 404, 
        msg: "Sorry, review not found"
      })
    }
  })
}