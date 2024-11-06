const { prisma } = require('./prisma');
const app = require('./app');
const { envConfig } = require('./configs');

let server;
prisma.$connect().then(() => {
  console.log('Connected to SQL Database');
  // loggerConfig.info('Connected to SQL Database');
  server = app.listen(envConfig.port, () => {
    console.log(`Server (${envConfig.env}) running on port ${envConfig.port}`);
    // loggerConfig.info(
    //   `Server (${envConfig.env}) running on port ${envConfig.port}`
    // );
  });
});

// const exitHandler = () => {
//   if (server) {
//     server.close(() => {
//       loggerConfig.info('Server closed');
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// };

const unexpectedErrorHandler = (error) => {
  // loggerConfig.error(error);
  console.log({ error });
  // exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  // loggerConfig.info('SIGTERM signal received');
  console.log('SIGTERM signal received');
  if (server) {
    server.close();
  }
});

process.on('SIGINT', () => {
  // loggerConfig.info('SIGTERM signal received');
  console.log('SIGTERM signal received');
  if (server) {
    server.close();
  }
});
