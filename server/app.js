var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var patientRouter = require('./routes/patient');
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users');
var programRouter = require('./routes/program');
var adminRouter = require('./routes/admin');
var exerciseRouter = require('./routes/exercise')


var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/patient', patientRouter);
app.use('/users', usersRouter);
app.use('/program', programRouter)
app.use('/', indexRouter)
app.use('/exercise', exerciseRouter )

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
 
});

module.exports = app;
