const jwtModule = require('jsonwebtoken');
const authController = require('../adapters/controllers/auth.controller');
const userRepository = require('../application/repositories/user.repository');
const authService = require('../application/services/auth.services');
const {
  authServiceFramework
} = require('../frameworks/services/authService.framework');
const bcryptService = require('../frameworks/services/bcrypted.framework');
const { validatePassword } = require('../middlewares');

const authRouter = (express) => {
  const router = express?.Router();

  const controller = authController(
    userRepository,
    authService,
    authServiceFramework,
    bcryptService,
    jwtModule
  );

  router.route('/login').post(controller.loginUser);
  router.route('/register').post(validatePassword, controller.registerUser);
  router.route('/oauth').post(controller.oauthUser);
  router.route('/activate').patch(validatePassword, controller.activatUser);

  return router;
};

module.exports = authRouter;
