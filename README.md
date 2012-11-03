# im-dash
Combine realtime (socket-io/socksjs) with anglular, and layout with bootstrap

The first objective is to have agents, or probes which can send metrics to a distributed dashboard, which is then viewed by the browser(s).

## Transports
Initial iplementation is done with simple messaging over socket-io.
  
    #from agent to browser
    socket.emit('metric',{key:'aKey',value:'aValue});
    #from browser to agent
    socket.emit('control',{key:'aKey',value:'aValue});

## Messaging protocol and flow


## Layout
Bootstrap to start. Maybe [Masonry](http://masonry.desandro.com/index.html) for tiling metrics.
See also [isotope](http://isotope.metafizzy.co/index.html).

Here is a jsfiddle with [masonry and angular](http://jsfiddle.net/roychoo/XVzUW/2/).

Here is help on isotope with a ng-repeat, and a watch for relayout

## Angular

Injecting into angular controller $scope is done this way:

    var sc = angular.element('#elementId').scope();
    sc.$apply(function(){
        sc.somevariable = 'somevalue'
    });

This ensures that the model updates are propagated appropriately.

## Real-time
 As of `0.9.11`, socket.io-client no longer requires install from github:master.

from `3rdEden: daneroo: see https://github.com/LearnBoost/socket.io-client/pull/471

## Deploying to cloudfoundry/appfog

    vmc push im-dash --runtime node08
    af push im-dash --runtime node08