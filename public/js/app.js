'use strict';

// Declare app level module which depends on filters, and services
angular.module('imDash',['imDash.services','imDash.directives'])
  .controller('RootCtrl',function($scope,socket){
    $scope.brand = "iMetrical Realtime";
    $scope.connectedCount=0;
    
    // message broadcast when server observes new/lost connections
    socket.on('count',function(count){
      // console.log('count');
      $scope.connectedCount=count;
    });
    
    // send a fake control command
    // setInterval(function(){
    //   socket.emit('control',{key:'name',value:'value'});
    // },10000);
});
