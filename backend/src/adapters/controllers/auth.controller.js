const activateAccount = require('../../application/use_cases/auth/activate_account.use_case');
const login = require('../../application/use_cases/auth/login.use_case');
const oauth = require('../../application/use_cases/auth/oatuh.use_case');
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
      const { email, password } = req.body;
      const data = await login(
        email,
        password,
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
    console.log(req.body);
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
      console.log({ data });
      res.status(data.statusCode).json(data);
    } catch (error) {
      console.log({ error });
      res.status(error.statusCode).json(error);
    }
  };

  const oauthUser = async (req, res) => {
    try {
      const { email, displayName } = req.body;
      const data = await oauth(
        { email, displayName },
        userRepository,
        authServices
      );
      res.status(data.statusCode || 200).json(data);
    } catch (error) {
      console.log({ error });
      res.status(error.statusCode || 500).json(error);
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

  return { loginUser, registerUser, oauthUser, activatUser };
};

module.exports = authController;
