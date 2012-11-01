# im-dash
Combine realtime (socket-io/socksjs) with anglular, and layout with bootstrap

## Layout
Bootstrap to start. Maybe [Masonry](http://masonry.desandro.com/index.html) or [isotope](http://isotope.metafizzy.co/index.html) for tiling metrics.

Here is a jsfiddle with masonry and angular.

Here is help on isotope with a ng-repeat, and a watch for relayout

## Angular

## Real-time
Finally figured out how to use xhr transport for socket-io. Simply use the master version of `socket.io-client`, and control the transport options as usual from server-side.

from `3rdEden: daneroo: see https://github.com/LearnBoost/socket.io-client/pull/471
