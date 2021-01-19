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
  if(err.status) {
    res.status(err.status).send({msg: err.msg})
  } else next(err)
}