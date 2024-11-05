const activateAccount = require('../../application/use_cases/auth/activate_account.use_case');
const changePassword = require('../../application/use_cases/auth/change_password.use_case');
const login = require('../../application/use_cases/auth/login.use_case');
const logout = require('../../application/use_cases/auth/logout.use_case');
const oauth = require('../../application/use_cases/auth/oatuh.use_case');
const register = require('../../application/use_cases/auth/register.use_case');

const authController = (
  userRepository,
  authService,
  authServiceFramework,
  bcryptService,
  jwtModule,
  userServices
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
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error.statusCode).json(error);
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
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error.statusCode).json(error);
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
      return res.status(data.statusCode || 200).json(data);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error);
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
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  };

  const changePasswordUser = async (req, res) => {
    try {
      const { id } = req.authUser.user;
      const data = await changePassword(
        id,
        req.body,
        authServices,
        userServices,
        bcryptService
      );
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  };

  const logoutUser = async (req, res) => {
    try {
      const data = await logout(req.authUser.user.id, userServices);
      console.log({ data });
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  };

  return {
    loginUser,
    registerUser,
    oauthUser,
    activatUser,
    changePasswordUser,
    logoutUser
  };
};

module.exports = authController;
