const userUseCase = require('../../application/use_cases/user.use_case');

const userController = () => {
  const getCurrentUser = async (req, res) => {
    try {
      const { id } = req.authUser.user;
      const data = await userUseCase.getProfileUser({ id });
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  };
  const updatedUser = async (req, res) => {
    try {
      const { id } = req.authUser.user;
      const data = await userUseCase.updatedUser(id, req.body);
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error?.statusCode || 500).json(error);
    }
  };
  const findAllUser = async (req, res) => {
    try {
      const { limit, page } = req.query;
      const data = await userUseCase.findManyUser(limit, page);
      return res.status(data.statusCode).json(data);
    } catch (error) {
      return res.status(error?.statusCode || 500).json(error);
    }
  };
  const getActiveUserAndSignup = async (req, res) => {
    try {
      const data = await userUseCase.getActiveUserAndSignupCounts();
      return res.status(data.statusCode).json(data);
    } catch (error) {
      console.log({ error });
      return res.status(error?.statusCode || 500).json(error);
    }
  };
  return { getCurrentUser, updatedUser, findAllUser, getActiveUserAndSignup };
};

module.exports = userController;
