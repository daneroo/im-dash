function MetricCtrl($scope){
  $scope.getTotalMetrics = function(){
    return $scope.metrics.length;
  };
  
  $scope.metrics = [
    {key:"bignumber", value:+new Date()},
    {key:"othernumber", value:Math.round(Math.random()*100)},
    {key:"persecond", value:Math.round(Math.random()*10)}
  ];
}