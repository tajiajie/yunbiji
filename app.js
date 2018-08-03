var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var logger = require('morgan');
var index = require('./controller/index');
require('./database/config')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())

app.use(session({
    secret:'jia',//签名秘钥
    resave:false,  //是否允许session重新修改
    saveUninitialized:true,  //是否重新保存初始化的session
    cookie:{ secure:false },
    store:new MongoStore({
        url: 'mongodb://localhost/testnote',
        ttl:14 * 24 * 60 * 60
    })
}))

app.use('/',index)


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
