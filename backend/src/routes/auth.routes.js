const jwtModule = require('jsonwebtoken');
const authController = require('../adapters/controllers/auth.controller');
const userRepository = require('../application/repositories/user.repository');
const authService = require('../application/services/auth.services');
const {
  authServiceFramework
} = require('../frameworks/services/authService.framework');
const bcryptService = require('../frameworks/services/bcrypted.framework');
const { validatePassword } = require('../middlewares');
const authMiddleware = require('../middlewares/auth.middleware');
const userServices = require('../application/services/user.services');

const authRouter = (express) => {
  const router = express?.Router();

  const controller = authController(
    userRepository,
    authService,
    authServiceFramework,
    bcryptService,
    jwtModule,
    userServices
  );

  router.route('/login').post(controller.loginUser);
  router.route('/register').post(validatePassword, controller.registerUser);
  router.route('/oauth').post(controller.oauthUser);
  router.route('/resend-code').post(authMiddleware, controller.resendCode);
  router.route('/activate').get(controller.activatUser);
  router
    .route('/change-password')
    .patch(authMiddleware, validatePassword, controller.changePasswordUser);
  router.route('/logout').patch(authMiddleware, controller.logoutUser);

  return router;
};

module.exports = authRouter;
