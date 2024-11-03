const errorMiddleware = require('./error.middleware');
const validateMiddleware = require('./validate.middleware');
const versionMiddleware = require('./version.middleware');
const xssMiddleware = require('./xss.middleware');

module.exports = {
  errorMiddleware,
  validateMiddleware,
  versionMiddleware,
  xssMiddleware
};
