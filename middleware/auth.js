const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // check for token
  if (!token) {
    return res.status(401).json({ message: 'auth.noToken' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ message: 'auth.tokenInvalid' });
  }
};

module.exports = auth;
