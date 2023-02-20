const jwt = require('jsonwebtoken');
const env = require('../config/env');

const privateKey = env.JWT_PRIVATE_KEY;

const signOptions = {
  expiresIn: 12 * 30 * 24 * 60 * 60, // Token expiration time - month * day * hours * minutes * seconds
  algorithm: 'HS512',
};

const sign = (payload) => jwt.sign(payload, privateKey, signOptions);

const verify = (token) => jwt.verify(token, privateKey);

module.exports = { sign, verify };
