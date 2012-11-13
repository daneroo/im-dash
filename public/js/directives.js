'use strict';

/* Directives */


angular.module('imDash.directives', []).
directive('logentry', function() {
  return {
    template: '<td class="time">{{entry.stamp |date:"HH:mm:ss" }}</td>' + '<td class="category">{{entry.category}}</td>' + '<td class="message">{{entry.data}}</td>',
    restrict: 'A'
  };
}).directive('sparkline', function() {
  return {
    restrict: 'E',
    terminal: true,
    scope: {
      val: '=',
      grouped: '='
    },
    link: function(scope, element, attrs) {
      var margin = 10,
        width = 400,
        height = 100 - .5 - margin;

      var svg = d3.select(element[0]).append("svg").attr("width", width).attr("height", height + margin);
      var interpolation = "basis"; // linear
      var transitionDelay = 1000;

      var data = [];
      var dataLength = 50;
      for(var i = dataLength - 1; i >= 0; i--) {
        data[i] = Math.random() * 10;
      };
      console.log(data.length);
      // X scale will fit values from 0-10 within pixels 0-100
      var x = d3.scale.linear().domain([0, 48]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition        // Y scale will fit values from 0-10 within pixels 0-100
      var y = d3.scale.linear().domain([0, 10]).range([0, height]);

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
        // console.log(newVal, oldVal);
        if(angular.equals(newVal, oldVal)) {
          console.log('equals');
          // return;
        }
        // clear the elements inside of the directive
        // svg.selectAll('*').remove();
        // if 'val' is undefined, exit
        if(!newVal) {
          return;
        }

        var v = data.shift(); // remove the first element of the array
        // data.push(v); 
        data.push(Math.random() * 10)

        // redrawWithAnimation();
        redrawWithoutAnimation();

      });
    }
  };
});