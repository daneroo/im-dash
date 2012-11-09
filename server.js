
var options = require('./lib/optconfig');

var ioOpts= (process.env.VMC_APP_PORT)?{
  'transports': [ 'xhr-polling','jsonp-polling']   
}:{};

var express = require('express');
var app = express();

// app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var server = require('http').createServer(app);

var io = require('socket.io').listen(server,ioOpts);
io.configure(function(){
  io.set('log level', 1);
});
io.configure('production', function(){
  // io.set('log level', 0);
});

console.log("Listening on http://"+options.host+":"+options.port);
server.listen(options.port,options.host);

function openCount(){
  // sockets.manager holds connected,open,closed,handshake, rooms, roomsCLient
  var m = io.sockets.manager;
  return Object.keys(m.open).length;
}

io.sockets.on('connection', function (socket) {  
  console.log("new connection");   
  io.sockets.emit('count',openCount());
  io.sockets.emit('ping','new connection ('+openCount()+')');
  socket.on('disconnect', function () {
    console.log("lost connetction: ");
    io.sockets.emit('count',openCount());
    io.sockets.emit('ping','lost connection ('+openCount()+')');
  });
});

setInterval(function(){
  io.sockets.emit('ping', 'hello everyone');
},5000)

io.sockets.on('connection', function (socket) {
  console.log("new connection"); 
  socket.emit('ping', 'first hello');
  setInterval(function(){
    socket.emit('ping', 'hello again');
  },5000);
  
  socket.on('metric', function (data) {
    socket.broadcast.emit('metric',data);
  });

  socket.on('control', function (data) {
    socket.broadcast.emit('control',data);
  });
  socket.on('ack', function (data) {
    socket.broadcast.emit('ack',data);
  });  
});
