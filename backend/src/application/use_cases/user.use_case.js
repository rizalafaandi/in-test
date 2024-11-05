const httpStatus = require('http-status');
const userService = require('../services/user.services');

class UserUseCase {
  async getProfileUser(id) {
    try {
      const user = await userService.getUserByUnique(id);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 400;
        throw error;
      }
      return {
        status: httpStatus[200],
        statusCode: 200,
        message: 'Success get user',
        result: { user }
      };
    } catch (error) {
      throw { ...error, message: error.message };
    }
  }
  async updatedUser(id, data) {
    try {
      const user = await userService.updateUser(id, data);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 400;
        throw error;
      }
      return {
        status: httpStatus[200],
        statusCode: 200,
        message: 'Success update user'
      };
    } catch (error) {
      throw { ...error, message: error.message };
    }
  }
  async findManyUser(limit, page) {
    try {
      const user = await userService.findManyUser({ limit, page });
      return {
        status: httpStatus[200],
        statusCode: 200,
        message: 'Success update user',
        result: user
      };
    } catch (error) {
      throw { ...error, message: error.message };
    }
  }

  async getActiveUserAndSignupCounts() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Mengatur awal hari ini

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Mengatur awal hari berikutnya

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      // today
      const countUser = await userService.countNumUser({});
      console.log({ today, tomorrow });
      // today
      const activeTodayCount = await userService.countNumUser({
        login_start_timestamp: {
          gte: today,
          lt: tomorrow
        }
      });

      // last 7 Days
      const activeLast7DaysCount = await userService.countNumUser({
        login_start_timestamp: {
          gte: sevenDaysAgo
        }
      });
      return {
        status: httpStatus[200],
        statusCode: 200,
        message: 'Success update user',
        result: { countUser, activeTodayCount, activeLast7DaysCount }
      };
    } catch (error) {
      throw { ...error, message: error.message };
    }
  }
}

module.exports = new UserUseCase();
