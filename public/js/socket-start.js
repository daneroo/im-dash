var socket = io.connect();
socket.on('connecting', function (transport_type) {
  console.log('connecting:',transport_type)
});

var pad2 = function(number) {
  return (number < 10 ? '0' : '') + number;
};
var timestamp = function() {
  var d = new Date();
  return d.getHours() + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
};

function logit(category,data){
  // console.log(category,data);
  data = JSON.stringify(data);
  
  var h = '<p><span class="time">'+timestamp()+'</span> '+
  '<span class="category">'+category+'</span> '+
  '<span class="message">'+data+'</span></p>'
  $('#logwell').append($(h));
  var n=$('#logwell p').length;
  if (n>10){
    $('#logwell p:lt('+(n-10)+')').remove()
  }
}

socket.on('ping', function (data) {
  logit('ping',data);
});

socket.on('metric', function (data) {
  // console.log(data);
  var sc = angular.element('#mmm').scope();
  sc.$apply(function(){
    sc.messageCount = (sc.messageCount||0)+1;
    sc.metrics[data.key]=data.value;
  });
});

setInterval(function(){
  socket.emit('control',{key:'name',value:'value'});
},10000);
