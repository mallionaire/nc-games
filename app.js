const e = require('express');
const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');
const { handles500s, handlesInvalidPaths, handleCustomErrors } = require('./errors/errors');

app.use('/api', apiRouter);

app.all('/*', handlesInvalidPaths);

app.use(handleCustomErrors)

app.use(handles500s);

module.exports = app;
