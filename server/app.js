const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');  //请求设置cookie
const logger = require('morgan');   //日志
const WebSocket = require('ws').Server;  //websocket
const userApi = require('./api/userApi');
const articleApi = require('./api/articleApi');
const uploadApi = require('./api/upload');
const pyony = require('./api/pyony');
const todayNews = require('./api/todayNews');

const app = express();
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
//websocket
const WebSocketServer =new WebSocket({
  port:3001
})
const Wsocket=()=>{
  WebSocketServer.on('connection',(ws)=>{
      ws.on('message',(msg)=>{
          WebSocketServer.clients.forEach((client)=>{
              client.send(msg);
          });
      })
  })
}
try{
  Wsocket()
}catch(e){
    console.log('正在重新连接...')
    setTimeout(()=>{
      Wsocket()
    },1000)
}
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
app.use(function(err,req, res, next) {
  return res.json({'success':false, 'msg':err.stack})
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://localhost:',port);
});
module.exports = app;
