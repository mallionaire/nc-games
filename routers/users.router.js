const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/users.controller');
const { handles405s } = require('../errors/errors');

usersRouter.route('/:username').get(getUserByUsername).all(handles405s);

module.exports = usersRouter;
