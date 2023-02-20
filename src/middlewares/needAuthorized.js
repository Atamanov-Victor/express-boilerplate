const { NOT_AUTHORIZED_ERROR_MESSAGE } = require('../config/errors');

const needAuthorizedMiddleware = (req, res, next) => {
  if (req.auth && req.auth._id) {
    next();
  } else {
    return res.status(403).json({ error: NOT_AUTHORIZED_ERROR_MESSAGE });
  }
};

module.exports = needAuthorizedMiddleware;
