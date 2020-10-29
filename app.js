var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');

const cors=require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connect = mongoose.connect(config.MongoUrl,{useNewUrlParser:true});

connect.then((db)=>{
  console.log("Connected correctly to the server.")
}),(err)=>{console.log(err);}

const sessionStore = new MongoStore({
  mongooseConnection:mongoose.connection,
  collection:'sessions'
});

const sessionMiddleWare = session({
  name:'session',
  secret:config.sessionSecret,
  resave:false,
  saveUninitialized:true,
  store:sessionStore,
  cookie:{
    maxAge:1000*60*60*24
  }
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contestRouter = require('./routes/contest');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('client/build'));

const corsOptions= {
  origin: true,
  credentials: true
};

app.options('*', cors(corsOptions));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:5000');
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Credentials','true');
  next();
});

app.use((req,res,next)=>sessionMiddleWare(req,res,next));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', usersRouter);
app.use('/api/contest',contestRouter);
app.use('/*', indexRouter);

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
