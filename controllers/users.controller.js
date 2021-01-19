const { fetchUserByUsername } = require('../models/users.model');

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  fetchUserByUsername(username).then(([user]) => {
    res.send({ user });
  }).catch(next);
};
