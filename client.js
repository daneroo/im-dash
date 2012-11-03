var io = require('socket.io-client');
var endpoint = 'http://localhost:8080';
var endpoint = 'http://im-dash.cloudfoundry.com:14838';
var options = {
  // 'try multiple transports':false,
  // transports:['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
  // transports:['xhr-polling']
};
var socket = io.connect(endpoint,options);

socket.on('connecting', function (transport_type) {
  console.log('connecting:',transport_type)
});
socket.on('connect', function () {
  console.log('connect:')
});

socket.on('control', function (data) {
  // server emitted a news event
  console.log('control:',data);
});

socket.on('disconnect', function () {
  console.log('disconnect:');
});

setInterval(function(){
  var id = Math.round(Math.random()*9999)%5;
  var val = Math.round(Math.random()*9973)%999;
  socket.emit('metric',{key:'metric-'+id,value:val});
},100);