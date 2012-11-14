'use strict';

/* Directives */


angular.module('imDash.directives', []).
directive('logentry', function() {
  return {
    template: '<td class="time">{{entry.stamp |date:"HH:mm:ss" }}</td>' + '<td class="category">{{entry.category}}</td>' + '<td class="message">{{entry.data}}</td>',
    restrict: 'A'
  };
}).directive('metric', function() {
  return {
    template: '<span class="muted">{{v.name}}</span><span class="metricValue pull-right">{{v.value}}</span><sparkline val="v.value" animate="animate"></sparkline>',
    restrict: 'E',
    scope: {
      v: '=',
      animate: '='
    },
    link: function(scope, element, attrs) {
      console.log('linking metric');
    }
  };
}).directive('sparkline', function() {
  console.log('compiling spark');

  return {
    // template: '<div class="zzz"></div>',
    restrict: 'E',
    terminal: true,
    scope: {
      val: '=',
      animate: '=',
      width: '=',
      height: '='
    },
    link: function(scope, element, attrs) {
      var width = scope.width || 100,
        height = scope.height || 24,
        marginY = 3
        console.log('linking spark', width, height);
      var svg = d3.select(element[0]).append("svg:svg").attr('width', width).attr('height', height);
      var interpolation = 'basis'; //'linear';
      var transitionDelay = 1000;
      var data = [];
      var dataLength = 20;
      for(var i = dataLength - 1; i >= 0; i--) {
        data[i] = 0;
      };

      var x = d3.scale.linear().domain([0, dataLength - 1]).range([-5, width]);
      // initial maxY=1
      var y = d3.scale.linear().domain([0, 1]).range([height - marginY, marginY]);

      function rescaleY() {
        var maxY = d3.max(data);
        y = d3.scale.linear().domain([0.1, maxY]).range([height - marginY, marginY]);
      };

      // var x = d3.scale.linear().domain([0, dataLength]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition        // Y scale will fit values from 0-10 within pixels 0-100
      // var y = d3.scale.linear().domain([0, 10]).range([0, height]);
      // create a line object that represents the SVN line we're creating
      var line = d3.svg.line().x(function(d, i) {
        return x(i);
      }).y(function(d) {
        return y(d);
      }).interpolate(interpolation)

      svg.append("path").attr('class', 'sparkline').attr("d", line(data));
      // or it can be done like this
      //graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);      

      function redrawWithoutAnimation() {
        // static update without animation
        svg.selectAll("path").data([data]) // set the new data
        .attr("d", line); // apply the new data values
      }

      function redrawWithAnimation() {
        // update with animation
        svg.selectAll("path").data([data]) // set the new data
        .attr("transform", "translate(" + x(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
        .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
        .transition() // start a transition to bring the new value into view
        .ease("linear").duration(transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
        .attr("transform", "translate(" + x(0) + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value
        /* thanks to 'barrym' for examples of transform: https://gist.github.com/1137131 */
      }

      scope.$watch('val', function(newVal, oldVal) {
        // console.log('watching spark', scope.animate);
        // console.log(newVal, oldVal);
        if(angular.equals(newVal, oldVal)) {
          // console.log('equals');
          // return;
        }
        // clear the elements inside of the directive
        // svg.selectAll('*').remove();
        // if 'val' is undefined, exit
        if(!newVal) {
          return;
        }
        // console.log('newVal,old', newVal, oldVal);
        data.shift(); // remove the first element of the array
        data.push(newVal);
        rescaleY();
        if(scope.animate) {
          redrawWithAnimation();
        } else {
          redrawWithoutAnimation();
        }
      });
    }
  };
});