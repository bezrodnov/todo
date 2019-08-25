const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // check for token
  if (!token) {
    return res.status(401).json({ message: 'auth.noToken' });
  }

  // TODO: remove this test code
  // simulate remote server on high load (delay response)
  setTimeout(() => {
    try {
      // verify token
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      // add user from payload
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(400).json({ message: 'auth.tokenInvalid' });
    }
  }, 0);
};

module.exports = auth;
