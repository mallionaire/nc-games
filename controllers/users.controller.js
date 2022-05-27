const { fetchUsers, fetchUserByUsername } = require('../models/users.model');

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  fetchUserByUsername(username)
    .then(([user]) => {
      res.send({ user });
    })
    .catch(next);
};
