const login = require('../../application/use_cases/auth/login.use_case');

const authController = (userRepository, authService, authServiceFramework) => {
  const dbRepository = userRepository;
  const authServices = authService(authServiceFramework?.());

  const loginUser = async (req, res, next) => {
    try {
      console.log({ req: req.body });
      const { email, password } = req.body;
      const data = login(email, password, dbRepository, authServices);
      res.send(data);
    } catch (error) {
      next(error);
    }
  };

  return { loginUser };
};

module.exports = authController;
