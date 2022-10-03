var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var flash = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var locaisRouter = require('./routes/locais');
var presencaRouter = require('./routes/presenca');
var sampledataRouter = require('./routes/sample_data');
var cadernetaRouter = require('./routes/caderneta');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret:'webslesson',
  cookie: {maxAge : 60000},
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/locais', locaisRouter);
app.use('/presenca', presencaRouter);
app.use('/sample_data', sampledataRouter);
app.use('/caderneta', cadernetaRouter);
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

module.exports = app;
