exports.up = function (knex) {
  return knex.schema.createTable('reviews', (gameReviewsTable) => {
    gameReviewsTable.increments('review_id').primary();
    gameReviewsTable.string('title').notNullable();
    gameReviewsTable.string('owner').references('users.username').notNullable();
    gameReviewsTable.string('designer').notNullable();
    gameReviewsTable.text('review_body').notNullable();
    gameReviewsTable.text('review_img_url').defaultTo(
      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png')
    gameReviewsTable
      .string('category')
      .references('categories.slug')
      .notNullable();
    gameReviewsTable.timestamp('created_at').defaultTo(knex.fn.now());
    gameReviewsTable.integer('votes').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('reviews');
};
