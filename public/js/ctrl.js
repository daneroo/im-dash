function MetricCtrl($scope,socket){
  $scope.getTotalMetrics = function(){
    return Object.keys($scope.metrics).length;
  };

  socket.on('metric', function (data) {
    // console.log(data);
    $scope.messageCount = ($scope.messageCount||0)+1;
    $scope.metrics[data.key]=data.value;
  });
  
  $scope.messageCount = 0;
  
  $scope.metrics = {
    example:42
  };
}
MetricCtrl.$inject = ['$scope', 'socket'];

function LogWellCtrl($scope,socket){
  var trim = 10;
  function logit(category,data){
    data = JSON.stringify(data);
    $scope.entries.push({stamp:new Date(),category:category,data:data});
    while ($scope.entries.length>trim) {
      $scope.entries.shift();
    }
  }
  socket.on('ping', function (data) {
    logit('ping',data);
  });
  
  $scope.entries = [
    {stamp:new Date(),category:'init',data:"I'm in a well"}
  ];
}
LogWellCtrl.$inject = ['$scope', 'socket'];
