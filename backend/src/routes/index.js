const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');

const routes = (app, express) => {
  app.use('/api/:version/auth', authRouter(express));
  app.use('/api/:version/user', userRouter(express));
};

module.exports = routes;
