const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/unauthorized');
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(authorization);
    next(new Unauthorized());
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    next(new Unauthorized('Авторизуйтесь на сайте'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
