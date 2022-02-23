var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sessionRouter = require('./routes/session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filterRouter = require('./routes/filter');
var listingRouter = require('./routes/listing');
var viewProfileRouter = require('./routes/profile');
var viewEditProfileRouter = require('./routes/edit-profile');
var viewHomePageRouter = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionRouter)
app.use('/index', indexRouter);
app.use('/', usersRouter);
app.use('/filter', filterRouter);
app.use('/listing', listingRouter);
app.use('/profile', viewProfileRouter);
app.use('/edit-profile', viewEditProfileRouter);
app.use('/homepage', viewHomePageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports.app = app;