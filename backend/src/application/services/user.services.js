const userRepository = require('../repositories/user.repository');

class UserService {
  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data) {
    return await userRepository.createUser(data);
  }

  async updateUser(id, data) {
    return await userRepository.updateUser(id, data);
  }

  async deleteUser(id) {
    return await userRepository.deleteUser(id);
  }
}

module.exports = new UserService();
