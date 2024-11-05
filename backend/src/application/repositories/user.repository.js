const { prisma } = require('../../prisma');

class UserRepository {
  async findByUnique(params) {
    return await prisma.users.findUnique({ where: params });
  }

  async findAllUser(params) {
    return await prisma.users.findMany({
      where: {
        is_active: true
      },
      take: params?.limit || 20,
      skip: params?.page ? (params?.page - 1) * params?.limit : 1
    });
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

  async countUser(params) {
    return await prisma.users.count({ where: params });
  }
}

module.exports = new UserRepository();
