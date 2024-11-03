const { prisma } = require('../../prisma');

class UserRepository {
  async findById(params) {
    console.log(params);
    return await prisma.users.findUnique({ where: params });
  }

  async createUser(data) {
    return await prisma.users.create({ data });
  }

  async updateUser(id, data) {
    return await prisma.users.update({ where: { id }, data });
  }

  async deleteUser(id) {
    return await prisma.users.delete({ where: { id } });
  }
}

module.exports = new UserRepository();
