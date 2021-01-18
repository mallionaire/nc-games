const {
  usersData,
  categoriesData,
  gameReviewsData,
  commentsData,
} = require("../data/test-data");
const { formatDates } = require("../../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const categoriesInsertions = knex("categories")
        .insert(categoriesData)
        .returning("*");
      const usersInsertions = knex("users").insert(usersData).returning("*");

      return Promise.all([categoriesInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedGamesReviews = formatDates(gameReviewsData)
      return knex('game-reviews').insert(formattedGamesReviews).returning('*')
    }).then(gameRows => {
      console.log(gameRows)
    })
};
