'use strict';

// Declare app level module which depends on filters, and services
angular.module('imDash',['imDash.services','imDash.directives'])
  .controller('RootCtrl',function($scope,socket){
    $scope.brand = "iMetrical Realtime";
    socket.on('ping from root', function (data) {		  
      console.log('ping',data);
    });
    setInterval(function(){
      socket.emit('control',{key:'name',value:'value'});
    },10000);
});
