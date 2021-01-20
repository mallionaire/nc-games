const connection = require('../db/connection');

exports.fetchUserByUsername = (username) => {
  return connection('users')
    .select('*')
    .where('username', username)
    .then((user) => {
      if (!user.length) {
        return Promise.reject({ status: 404, msg: 'Sorry, User not found.' });
      } else return user;
    });
};
