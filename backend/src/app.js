const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const { morganConfig } = require('./configs');
const routes = require('./routes');
const { errorMiddleware, xssMiddleware } = require('./middlewares');
const { apiError } = require('./utils');
const { firebaseInit } = require('./modules/firebase.modules');

const app = express();

app.use(morganConfig.successHandler);
app.use(morganConfig.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xssMiddleware());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication

// limit repeated failed requests to auth endpoints
// if (envConfig.env === 'production') {
//   app.use('/v1/auth', authLimiterMiddleware);
// }

app.use('/', express.static('public'));

// routes
routes(app, express);

// send back a 404 error for any unknown request
app.use((req, res, next) => {
  next(new apiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorMiddleware.errorConverter);

// handle error
app.use(errorMiddleware.errorHandler);

// fix 'how serialize a BigInt'
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

// firebase oauth
const firebase = firebaseInit();

//test
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
    res.send('heheh');
  } catch (e) {
    res.redirect('register');
  }
});

module.exports = app;
