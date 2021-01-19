const { fetchReviewById, updateVotes } = require("../models/reviews.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id).then(([review]) => {
    res.status(200).send({review})
  }).catch(next)
};


exports.patchVotes = (req,res,next) => {
  const {review_id }= req.params
  const {inc_votes } = req.body 
  // console.log(review_id, inc_votes)
  updateVotes(review_id, inc_votes).then(([review])=> {
    res.status(200).send({review})
  }).catch(next)
}