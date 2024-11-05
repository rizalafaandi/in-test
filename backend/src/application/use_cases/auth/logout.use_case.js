const httpStatus = require('http-status');

const logout = async (id, userServices) => {
  try {
    const user = await userServices.getUserByUnique({ id });

    const timeLogout = new Date();

    if (!user.login_start_timestamp) {
      const error = new Error('Login time not set');
      error.statusCode = 400;
      throw error;
    }
    let totalDuration = 0;
    const duration =
      new Date(timeLogout) - new Date(user.login_start_timestamp);

    if (!user.total_login_duration) {
      totalDuration = duration;
    } else {
      totalDuration = +user.total_login_duration + duration;
    }

    await userServices.updateUser(id, {
      login_end_timestamp: timeLogout.toISOString(),
      total_login_duration: totalDuration.toString()
    });

    return {
      status: httpStatus[200],
      statusCode: 200,
      message: 'Success to logout'
    };
  } catch (error) {
    throw { ...error, message: error.message };
  }
};

module.exports = logout;
