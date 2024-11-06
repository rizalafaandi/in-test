const httpStatus = require('http-status');

const oauth = async (data, userRepository, authService) => {
  try {
    if (!data?.email) {
      const error = new Error('Payload not valid');
      error.statusCode = 400;
      throw error;
    }
    const user = await userRepository.findByUnique({ email: data?.email });
    let is_active = user?.is_active;
    const payload = { user: { id: user?.id } };
    if (!user) {
      const newUser = await userRepository.createUser({
        email: data?.email,
        nickname: data?.displayName,
        is_active: true,
        signup_timestamp: new Date().toISOString(),
        login_start_timestamp: new Date().toISOString(),
        num_time_login: 1
      });
      payload.user.id = newUser?.id;
      is_active = newUser?.is_active;
    } else {
      const updatedUser = await userRepository.updateUser(user.id, {
        num_time_login: {
          increment: 1
        },
        login_start_timestamp: new Date().toISOString()
      });
      payload.user.id = updatedUser?.id;
      is_active = updatedUser?.is_active;
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
