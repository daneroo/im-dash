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
  console.log('control:',data);
  if (data && data.key==='speed' && data.agent===options.name){
    adjustSpeed(data.value);
  }
});

socket.on('disconnect', function () {
  console.log('disconnect:');
});

function sprayValues(){
  var id = Math.round(Math.random()*9999)%4;
  var val = Math.round(Math.random()*9973)%999;
  socket.emit('metric',{agent:options.name,key:'metric-'+id,value:val});  
}
// speeds are 20,200,2000
var ms=200;
function adjustSpeed(incr){
   if (incr>0){
     if (ms<2000) ms=ms*10;
   } else {
     if (ms>20) ms=ms/10;
   }
   console.log('adjusted speed to',ms);
   clearInterval(intv);
   intv = setInterval(sprayValues,ms);
   socket.emit('ack',{agent:options.name,key:'speed',value:(1000/ms)+"/s"});  
}

var intv = setInterval(sprayValues,ms);
socket.emit('ack',{agent:options.name,key:'speed',value:(1000/ms)+"/s"});  

// // randomly vary the speed
// setInterval(function(){
//   adjustSpeed(Math.random()-0.5);
// },5000);
