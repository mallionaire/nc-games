exports.handles500s = (err, req, res, next) => {
  console.log(err, "what's going on here???");
};

exports.handlesInvalidPaths = (req, res, next) => {
  res.status(404).send({ msg: 'Sorry, invalid route' });
};

exports.handles405s = (req, res, next) => {
  res.status(405).send({ msg: 'Sorry, method not allowed' });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  //console.log(err);
  const psqlCodes = {
    '22P02': { msg: 'Bad request', status: 400 },
    23502: { msg: 'Sorry, unprocessable entity', status: 422 },
    23503: { msg: 'Sorry, not found', status: 404 },
  };

  if (err.code) {
    for (let key in psqlCodes) {
      //console.log(typeof key);
      if (err.code === key) {
        const { status, msg } = psqlCodes[key];

        res.status(status).send({ msg });
      }
    }
  } else next(err);
};
