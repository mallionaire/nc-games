const categories = require('../data/test-data/categories');

exports.up = function (knex) {
  return knex.schema.createTable('categories', (categoriesTable) => {
    categoriesTable.string('slug').primary();
    categoriesTable.string('description').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
