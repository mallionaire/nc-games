exports.up = function (knex) {
  return knex.schema.createTable('reviews', (gameReviewsTable) => {
    gameReviewsTable.increments('review_id').primary();
    gameReviewsTable.string('title').notNullable();
    gameReviewsTable.string('owner').references('users.username').notNullable();
    gameReviewsTable.string('designer').notNullable();
    gameReviewsTable.text('review_body').notNullable();
    gameReviewsTable
      .text("review_img_url")
      .defaultTo(
        "https://images.pexels.com/photos/792051/pexels-photo-792051.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      );
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
