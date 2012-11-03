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
console.log("Listening on http://localhost:"+serverPort);
server.listen(serverPort);

io.sockets.on('connection', function (socket) {
  console.log("got connetction");
  
  socket.emit('ping', 'first hello');
  setInterval(function(){
    socket.emit('ping', 'hello again');
  },5000)
  
  socket.on('metric', function (data) {
    console.log('metric:',data);
	  socket.broadcast.emit('metric',data);
  });
  
  socket.on('control', function (data) {
    console.log('control:',data);
	  socket.broadcast.emit('control',data);
  });
  
});