exports.up = function (knex) {
  return knex.schema.createTable('game-reviews', (gameReviewsTable) => {
    gameReviewsTable.increments('game_review_id').primary();
    gameReviewsTable.string('title').notNullable();
    gameReviewsTable.string('owner').references('users.username').notNullable();
    gameReviewsTable.string('designer').notNullable();
    gameReviewsTable.text('body').notNullable();
    gameReviewsTable
      .string('category')
      .references('categories.slug')
      .notNullable();
    gameReviewsTable.timestamp('created_at').defaultTo(knex.fn.now());
    gameReviewsTable.integer('votes').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('game-reviews');
};
