const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/users.controller');

usersRouter.route('/:username').get(getUserByUsername).all(handles405s);

module.exports = usersRouter;
