const jwt = require('jsonwebtoken');
const { envConfig } = require('../configs');

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    const authToken = req.headers.authorization;
    const prefix = 'Bearer';
    if (authToken.startsWith(prefix)) {
      const token = authToken.slice(prefix.length + 1, authToken.length);
      try {
        const results = jwt.verify(token, envConfig.jwt.secret);
        req.authUser = results;
        next();
      } catch (error) {
        console.log({ error });
        return res.status(401).json({ msg: 'Token Expired' });
      }
    }
  } else {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
