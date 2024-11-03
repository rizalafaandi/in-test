const authController = require('../adapters/controllers/auth.controller');
const userRepository = require('../application/repositories/user.repository');
const authService = require('../application/services/auth.services');
const {
  authServiceFramework
} = require('../frameworks/services/authService.framework');

const authRouter = (express) => {
  const router = express?.Router();

  const controller = authController(
    userRepository,
    authService,
    authServiceFramework
  );

  router.route('/login').post(controller.loginUser);

  return router;
};

module.exports = authRouter;
