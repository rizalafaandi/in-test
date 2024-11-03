const login = async (email, password, userRepository, authService) => {
  try {
    if (!email || !password) {
      const error = new Error('email and password fields cannot be empty');
      error.statusCode = 401;
      throw error;
    }
    const user = await userRepository.findById({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }
    const isMatch = authService.compare(password, user?.password || '');
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
    const payload = {
      user: {
        id: user?.id
      }
    };
    return authService.generateToken(payload);
  } catch (error) {
    console.log({ error });
  }
};

module.exports = login;
