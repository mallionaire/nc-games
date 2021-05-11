const db = require('../db/connection');

exports.fetchAllCategories = () => {
  return db.query('SELECT * FROM categories;').then((result) => result.rows);
};

exports.checkCategoryExists = (category) => {
  return db
    .query('SELECT * FROM categories WHERE slug = $1;', [category])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: 'Sorry, category not found.',
        });
      }
    });
};

exports.addCategory = (newCategory) => {
  return db
    .query(
      'INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *;',
      [newCategory.slug, newCategory.description]
    )
    .then(({ rows }) => rows);
};
