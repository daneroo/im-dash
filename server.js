// Config section
var port = (process.env.VMC_APP_PORT || 8080);
var host = (process.env.VCAP_APP_HOST || '0.0.0.0'|| 'localhost');
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

console.log("Listening on http://"+host+":"+port);
server.listen(port);

io.sockets.on('connection', function (socket) {
  console.log("got connetction");
  
  socket.emit('ping', 'first hello');
  setInterval(function(){
    socket.emit('ping', 'hello again');
  },5000)
  
  socket.on('metric', function (data) {
    // console.log('metric:',data);
	  socket.broadcast.emit('metric',data);
  });
  
  socket.on('control', function (data) {
    // console.log('control:',data);
	  socket.broadcast.emit('control',data);
  });
  
});