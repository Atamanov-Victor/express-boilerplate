const { verify } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  let auth = {};

  if (req.headers.authorization) {
    auth = verify(req.headers.authorization);
  }

  if (req.query && req.query.authToken) {
    try {
      auth = verify(req.query.authToken);
    } catch (err) {
      console.log('query.authToken invalid', req.query.authToken);
    }
  }

  if (req.body && req.body.authToken) {
    auth = verify(req.body.authToken);
  }

  req.auth = auth;
  next();
};

module.exports = authMiddleware;
