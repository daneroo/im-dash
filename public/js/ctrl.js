function MetricCtrl($scope){
  $scope.getTotalMetrics = function(){
    return Object.keys($scope.metrics).length;
  };
  
  $scope.messageCount = 0;
  
  $scope.metrics = {
    example:42
  };
}