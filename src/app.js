const express = require('express');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
// const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
// const { jwtStrategy } = require('./config/passport');
// const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/root');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// root routes
app.use('/', routes);

// Set EJS as the view engine
app.set('views', './src/views')
app.set('templates', './views/containers')
app.set('view engine', 'ejs')
app.set('view options', {delimiter: '?'});

// Static Files
app.use(express.static('./dist'))

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
