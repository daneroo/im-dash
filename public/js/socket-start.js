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
  console.log(category,data);
  var h = '<p><span class="time">'+timestamp()+'</span><span class="message">'+category+' '+data+'</span></p>'
  $('#logwell').append($(h));
  var n=$('#logwell p').length;
  if (n>10){
    $('#logwell p:lt('+(n-10)+')').remove()
  }
}
socket.on('server2client', function (data) {
  logit('server2client:',data);
});
socket.on('client2server', function (data) {
  logit('client2server:',data);
  var d = +new Date;
  var sc = angular.element('#mmm').scope();
  sc.$apply(function(){
    sc.metrics[0].value = d
    // perform any model changes or method invocations here on angular app.
    sc.metrics.push({key:"metric:"+d, value:d});
  });
  console.log('should have set',d);
});

setInterval(function(){
  console.log('--still alive');
  socket.emit('client2server','from browser');
},10000);
