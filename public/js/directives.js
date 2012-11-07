'use strict';

/* Directives */


angular.module('imDash.directives', []).
  directive('logentry', function() {
    return {
      template: '<span class="time">{{entry.stamp |date:"HH:mm:ss" }}</span>'+
      '<span class="category">{{entry.category}}</span>'+
      '<span class="message">{{entry.data}}</span></p>',
      restrict: 'E',
      scope:{
        'entry':'=',
      },
      link: function postLink(scope, element, attrs) {
        // element.text('this is the metric directive');
      }
    };
  });
