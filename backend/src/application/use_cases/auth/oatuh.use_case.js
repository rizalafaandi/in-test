const httpStatus = require('http-status');

const oauth = async (data, userRepository, authService) => {
  try {
    if (!data?.email) {
      const error = new Error('Payload not valid');
      error.statusCode = 400;
      throw error;
    }
    const user = await userRepository.findById({ email: data?.email });
    let is_active = user?.is_active;
    const payload = { user: { id: user?.id } };
    if (!user) {
      const newUser = await userRepository.createUser({
        email: data?.email,
        nickname: data?.displayName,
        is_active: true
      });
      payload.user.id = newUser?.id;
      is_active = newUser?.is_active;
    }
    return {
      status: httpStatus[200],
      statusCode: 200,
      message: 'Success to login',
      result: {
        accessToken: authService.generateToken(payload),
        is_active
      }
    };
  } catch (error) {
    throw { ...error, message: error.message };
  }
};

module.exports = oauth;
