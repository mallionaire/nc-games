const e = require('express');
const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');
const { handles500s, handlesInvalidPaths } = require('./errors/errors');

app.use('/api', apiRouter);

app.all('/*', handlesInvalidPaths);

app.use(handles500s);

module.exports = app;
