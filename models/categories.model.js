const connection = require('../db/connection');

exports.fetchAllCategories = () => {
  return connection.select('*').from('categories');
};
