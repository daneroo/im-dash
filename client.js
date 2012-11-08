var options = require('./lib/optconfig-client');

console.log('connecting to:', options.server,'as:',options.name);
var io = require('socket.io-client');
var socket = io.connect(options.server); // ,ioOpts

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
  socket.emit('metric',{agent:options.name,key:'metric-'+id,value:val});
},200);