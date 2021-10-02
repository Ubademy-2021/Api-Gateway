const serialize = require('serialize-javascript');
const deserialize = str => eval(`(${str})`);

const buildResponse = data => ({
  status: 'OK',
  data,
});

const buildError = err => ({
  status: 'ERROR',
  error: err.toString(),
});

exports.getUsers = (req, res) => {
  res.send('prueba');
}
