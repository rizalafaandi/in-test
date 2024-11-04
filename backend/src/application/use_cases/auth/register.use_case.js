const nodemailer = require('nodemailer');
const { sendMailActivate } = require('../../../modules/nodemailer.modules');

const register = async (
  email,
  password,
  userRepository,
  bcryptService,
  jwtModule,
  options
) => {
  try {
    if (!email || !password) {
      const error = new Error('email and password fields cannot be empty');
      throw error;
    }
    const user = await userRepository.findById({ email });
    if (user) {
      const error = new Error('Email already used by another');
      error.statusCode = 409;
      throw error;
    }
    const hashPass = await bcryptService.bcryptHashedPassword(password);
    await userRepository.createUser({ email, password: hashPass });
    const token = jwtModule.sign(
      { id: user?.id },
      process.env.KEY_ACTIVATE_ACCOUNT
    );
    sendMailActivate(
      nodemailer,
      `${options?.host}/api/v1/auth/activate?email=${user?.email}&token=${token}}`,
      email
    );
    return {
      statusCode: 201,
      success: true,
      message: 'success register, check your email for verification'
    };
  } catch (error) {
    throw { ...error, message: error.message };
  }
};

module.exports = register;
