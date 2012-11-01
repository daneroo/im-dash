var io = require('socket.io-client');
var options = {
  // 'try multiple transports':false,
  // transports:['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
  // transports:['xhr-polling']
};
var socket = io.connect('http://localhost:8080',options);

socket.on('connecting', function (transport_type) {
  console.log('connecting:',transport_type)
});
socket.on('connect', function () {
  console.log('connect:')
});
socket.on('server2client', function (data) {
  // server emitted a news event
  console.log('server2client:',data);
});
socket.on('client2server', function (data) {
  // server emitted a news event
  console.log('client2server:',data);
});

socket.on('disconnect', function () {
  console.log('disconnect:');
});

setInterval(function(){
  console.log('--still alive');
  socket.emit('client2server','with data');
},5000);