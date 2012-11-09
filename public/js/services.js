'use strict';

/* Services */
angular.module('imDash.services', []).
  value('version', '0.1').
  factory('socket', function ($rootScope) {
    // var socket = io.connect("http://imetrical.dash.jit.su:80/");
    var socket = io.connect();    
    socket.on('connecting', function (transport_type) {
      // console.log('connecting with:',transport_type)
    });
    
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });
