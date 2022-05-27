const usersRouter = require('express').Router();
const {
  getUsers,
  getUserByUsername,
} = require('../controllers/users.controller');
const { handles405s } = require('../errors/errors');

usersRouter.route('/').get(getUsers).all(handles405s);

usersRouter.route('/:username').get(getUserByUsername).all(handles405s);

module.exports = usersRouter;
