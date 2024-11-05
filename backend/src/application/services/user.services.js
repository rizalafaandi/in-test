const userRepository = require('../repositories/user.repository');

class UserService {
  async getUserByUnique(params) {
    const user = await userRepository.findByUnique(params);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findManyUser(params) {
    const users = await userRepository.findAllUser(params);
    return users;
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

  async countNumUser(params) {
    return await userRepository.countUser(params);
  }
}

module.exports = new UserService();
