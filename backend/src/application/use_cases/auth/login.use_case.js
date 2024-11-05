const httpStatus = require('http-status');
const nodemailer = require('nodemailer');
const { sendMailActivate } = require('../../../modules/nodemailer.modules');

const login = async (
  email,
  password,
  userRepository,
  authService,
  jwtModule,
  options
) => {
  try {
    if (!email || !password) {
      const error = new Error('email and password fields cannot be empty');
      error.statusCode = 401;
      throw error;
    }
    const user = await userRepository.findByUnique({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }
    if (!user.is_active) {
      const token = jwtModule.sign(
        { id: user?.id },
        process.env.KEY_ACTIVATE_ACCOUNT
      );
      sendMailActivate(
        nodemailer,
        `${options?.host}/api/v1/auth/activate?email=${user?.email}&token=${token}}`,
        email
      );
      const error = new Error(
        'Your account not active. Please check your email and confirm for activation '
      );
      error.statusCode = 401;
      throw error;
    }
    const isMatch = authService.compare(password, user?.password || '');
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
    await userRepository.updateUser(user?.id, {
      login_start_timestamp: new Date().toISOString(),
      num_time_login: {
        increment: 1
      }
    });
    const payload = {
      user: {
        id: user?.id
      }
    };
    return {
      status: httpStatus[200],
      statusCode: 200,
      message: 'Success to login',
      result: {
        accessToken: authService.generateToken(payload),
        is_active: user?.is_active
      }
    };
  } catch (error) {
    throw { ...error, message: error.message };
  }
};

module.exports = login;
