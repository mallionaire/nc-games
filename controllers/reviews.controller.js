const { request } = require('express');
const e = require('express');
const {
  fetchReviewById,
  updateVotes,
  fetchAllReviews,
} = require('../models/reviews.model');
const { fetchUserByUsername } = require('../models/users.model');
const { checkCategoryExists } = require('../models/categories.model');

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then(([review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  // console.log(review_id, inc_votes)
  updateVotes(review_id, inc_votes)
    .then(([review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getAllReviews = (req, res, next) => {
  const { sort_by, order, owner, category } = req.query;

  const allReviews = fetchAllReviews(sort_by, order, owner, category);

  // let doesUserExist;

  // if (owner) {
  //   doesUserExist = fetchUserByUsername(owner);
  // } else {
  //   doesUserExist = Promise.resolve();
  // }

  const doesUserExist = owner ? fetchUserByUsername(owner) : Promise.resolve();

  const doesCategoryExist = category
    ? checkCategoryExists(category)
    : Promise.resolve();

  Promise.all([allReviews, doesUserExist, doesCategoryExist])
    .then(([reviews]) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};
