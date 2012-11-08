'use strict';

// Declare app level module which depends on filters, and services
angular.module('imDash',['imDash.services','imDash.directives'])
  .controller('RootCtrl',function($scope,socket){
    $scope.brand = "iMetrical Realtime";
    $scope.connectedCount=0;
    socket.on('ping', function (data) {		  
      console.log('root ping',data);
    });
    socket.on('count',function(count){
      $scope.connectedCount=count;
    })
    setInterval(function(){
      socket.emit('control',{key:'name',value:'value'});
    },10000);
});
