const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { envConfig } = require('../../configs');

module.exports = {
  authServiceFramework() {
    const encryptPassword = (password) => {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
    };

    const compare = (password, hashedPassword) =>
      bcrypt.compareSync(password, hashedPassword);

    const verify = (token) => jwt.verify(token, envConfig.jwtSecret);

    const generateToken = (payload) =>
      jwt.sign(payload, envConfig.jwt.secret, {
        expiresIn: 360000
      });

    return {
      encryptPassword,
      compare,
      verify,
      generateToken
    };
  }
};
