var express = require('express');
var app = express();

// app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var server = require('http').createServer(app);

var io = require('socket.io').listen(server,{
	// transports:['xhr-polling']
	// transports:['jsonp-polling']
});

var serverPort=8080;

server.listen(serverPort);

io.sockets.on('connection', function (socket) {
  console.log("got connetction");
  socket.emit('server2client', 'first hello');
  setTimeout(function(){
    socket.emit('server2client', 'hello again');
  },5000)
  socket.on('client2server', function (data) {
    console.log('client2server:',data);
	  socket.broadcast.emit('client2server',data+' for everyone');
  });
});