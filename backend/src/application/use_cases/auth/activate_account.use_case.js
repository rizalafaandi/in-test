const activateAccount = async (email, token, userRepository, jwtModule) => {
  try {
    if (!email || !token) {
      const error = new Error('Link not valid');
      throw error;
    }
    const user = await userRepository.findById({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    const verify = await jwtModule.verify(
      token,
      process.env.KEY_ACTIVATE_ACCOUNT
    );
    if (!verify || verify?.id != user.id) {
      const error = new Error('Link not valid');
      error.statusCode = 400;
      throw error;
    }
    await userRepository.updateUser(user?.id, { is_active: true });
    return {
      statusCode: 200,
      success: true,
      message: 'Yeyy, your account have ben activated'
    };
  } catch (error) {
    return error;
  }
};

module.exports = activateAccount;
