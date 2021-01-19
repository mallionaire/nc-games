const connection = require("../db/connection");

exports.fetchReviewById = (review_id) => {
  return connection("reviews")
    .select("reviews.*")
    .where("reviews.review_id", review_id)
    .leftJoin("comments", "reviews.review_id", "comments.review_id")
    .count("comment_id AS comment_count")
    .groupBy("reviews.review_id")
};

////  [
//       {
//         review_id: 2,
//         title: 'Jenga',
//         owner -> author: 'philippaclaire9',
//         designer: 'Leslie Scott',
//         review_body: 'Fiddly fun for all the family',
//         review_img_url: 'https://www.golenbock.com/wp-content/uploads/ 2015/01/placeholder-user.png',
//         category: 'Dexterity',
//         created_at: 2021-01-18T10:01:41.251Z,
//         votes: 5
//          comment_count: 10
//       }
//     ]
