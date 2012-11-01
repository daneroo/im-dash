var socket = io.connect();
socket.on('connecting', function (transport_type) {
  console.log('connecting:',transport_type)
});
socket.on('server2client', function (data) {
  // server emitted a news event
  console.log('server2client:',data);
});

setInterval(function(){
  console.log('--still alive');
  socket.emit('client2server','with data');
},5000);
