const activateAccount = require('../../application/use_cases/auth/activate_account.use_case');
const login = require('../../application/use_cases/auth/login.use_case');
const register = require('../../application/use_cases/auth/register.use_case');

const authController = (
  userRepository,
  authService,
  authServiceFramework,
  bcryptService,
  jwtModule
) => {
  const dbRepository = userRepository;
  const authServices = authService(authServiceFramework?.());

  const loginUser = async (req, res) => {
    try {
      const { email, password, displayName, sign_method } = req.body;
      const data = await login(
        email,
        password,
        sign_method,
        displayName,
        dbRepository,
        authServices,
        jwtModule,
        {
          host: `${req.protocol}://${req.headers?.host}`
        }
      );
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(error.statusCode).json(error);
    }
  };

  const registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await register(
        email,
        password,
        userRepository,
        bcryptService,
        jwtModule,
        {
          host: `${req.protocol}://${req.headers?.host}`
        }
      );
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(error.statusCode).json(error);
    }
  };

  const activatUser = async (req, res) => {
    try {
      const { email, token } = req.query;
      const data = await activateAccount(
        email,
        token,
        userRepository,
        jwtModule
      );
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(error.statusCode).json(error);
    }
  };

  return { loginUser, registerUser, activatUser };
};

module.exports = authController;
