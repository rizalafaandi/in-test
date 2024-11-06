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
    const user = await userRepository.findByUnique({ email });
    if (user) {
      const error = new Error('Email already used by another');
      error.statusCode = 409;
      throw error;
    }
    const hashPass = await bcryptService.bcryptHashedPassword(password);
    const newUser = await userRepository.createUser({
      email,
      password: hashPass,
      signup_timestamp: new Date().toISOString()
    });
    const token = jwtModule.sign(
      { id: user?.id },
      process.env.KEY_ACTIVATE_ACCOUNT
    );
    sendMailActivate(
      nodemailer,
      `${options?.host}/api/v1/auth/activate?email=${newUser?.email}&token=${token}}`,
      email
    );
    return {
      statusCode: 201,
      success: true,
      message: 'success register, check your email for verification'
    };
  } catch (error) {
    console.log({ error });
    throw { ...error, message: error.message };
  }
};

module.exports = register;
