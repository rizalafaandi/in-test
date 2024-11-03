const authRouter = require('./auth.routes');

const routes = (app, express) => {
  app.use('/api/:version/auth', authRouter(express));
};

module.exports = routes;
