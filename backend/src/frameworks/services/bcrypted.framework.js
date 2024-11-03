const bcrypt = require('bcryptjs');

const bcryptHashedPassword = async (password) => {
  try {
    if (!password) throw new Error('password is required');
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  } catch (error) {
    return error;
  }
};

module.exports = { bcryptHashedPassword };
