const userService = require('../services/user.services');

class GetUser {
  async execute(id) {
    try {
      return await userService.getUserById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new GetUser();
