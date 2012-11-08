'use strict';

/* Directives */


angular.module('imDash.directives', []).
  directive('logentry', function() {
    return {
      template: '<td class="time">{{entry.stamp |date:"HH:mm:ss" }}</td>'+
      '<td class="category">{{entry.category}}</td>'+
      '<td class="message">{{entry.data}}</td>',
      restrict: 'A'
    };
  });
