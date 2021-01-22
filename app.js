const express = require("express");
const cors = require('cors')
const app = express();
const apiRouter = require("./routers/api.router");
const {
  handles500s,
  handlesInvalidPaths,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./errors/errors");

app.use(cors())
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRouter);

app.all("/*", handlesInvalidPaths);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handles500s);

module.exports = app;
