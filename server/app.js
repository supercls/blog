var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');  //请求设置cookie
var logger = require('morgan');   //日志
const userApi = require('./api/userApi');
const articleApi = require('./api/articleApi');
const uploadApi = require('./api/upload');
const pyony = require('./api/pyony');
const todayNews = require('./api/todayNews');

var app = express();
app.use(function (req, res, next) {  //解决跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method == "OPTIONS") {
    res.send(200);
  }
  else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   //静态资源目录

app.use('/api/user', userApi);
app.use('/api/article',articleApi)
app.use('/api/upload',uploadApi)
app.use('/api/pyony',pyony)
app.use('/api/webs',todayNews)

// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
  return res.json({'success':false, 'msg':err.stack})
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


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://localhost:',port);
});
module.exports = app;
