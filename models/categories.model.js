const connection = require('../db/connection');

exports.fetchAllCategories = () => {
  return connection.select('*').from('categories');
};

exports.checkCategoryExists = (category) => {
  return connection
    .select('*')
    .from('categories')
    .where('categories.slug', category)
    .then((category) => {
      if (!category.length) {
        return Promise.reject({
          status: 404,
          msg: 'Sorry, category not found.',
        });
      }
    });
};

exports.addCategory = (newCategory) => {
  return connection('categories').insert(newCategory).returning('*');
};
