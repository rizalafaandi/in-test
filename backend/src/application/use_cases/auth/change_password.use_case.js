const httpStatus = require('http-status');

const changePassword = async (
  id,
  data,
  authService,
  userService,
  bcryptService
) => {
  try {
    if (!data?.oldPassword || !data?.newPassword) {
      const error = new Error('email and password fields cannot be empty');
      error.statusCode = 400;
      throw error;
    }
    const user = await userService.getUserByUnique({ id });
    if (!user.password) {
      const hashPass = await bcryptService.bcryptHashedPassword(
        data?.newPassword
      );
      await userService.updateUser(id, {
        password: hashPass
      });
      return {
        status: httpStatus[200],
        statusCode: 200,
        message: 'Success change password'
      };
    }
    const isMatch = await authService.compare(
      data?.oldPassword,
      user?.password
    );
    if (!isMatch) {
      const error = new Error(
        'Invalid old password not match with user password'
      );
      error.statusCode = 400;
      throw error;
    }
    const hashPass = await bcryptService.bcryptHashedPassword(
      data?.newPassword
    );
    const updatedUser = await userService.updateUser(id, {
      password: hashPass
    });
    if (!updatedUser) {
      const error = new Error('Ops, there something wrong, try again later');
      error.statusCode = 500;
      throw error;
    }
    return {
      status: httpStatus[200],
      statusCode: 200,
      message: 'Success change password'
    };
  } catch (error) {
    throw { ...error, message: error.message };
  }
};

module.exports = changePassword;
