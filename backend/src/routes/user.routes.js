const userController = require('../adapters/controllers/user.controller');
const userRepository = require('../application/repositories/user.repository');
const authMiddleware = require('../middlewares/auth.middleware');

const userRouter = (express) => {
  const router = express?.Router();

  const controller = userController(userRepository);

  router.route('/all').get(authMiddleware, controller.findAllUser);
  router
    .route('/num-active-signup')
    .get(authMiddleware, controller.getActiveUserAndSignup);
  router.route('/profile').get(authMiddleware, controller.getCurrentUser);
  router.route('/profile').patch(authMiddleware, controller.updatedUser);

  return router;
};

module.exports = userRouter;
