function MetricCtrl($scope,socket){
  $scope.getTotalAgents = function(){
    return Object.keys($scope.agents).length;
  };

  socket.on('metric', function (data) {
    // console.log(data);
    $scope.messageCount = ($scope.messageCount||0)+1;
    var agentName = data.agent||'anonymous';
    $scope.agents[agentName] = $scope.agents[agentName]||{};
    var metricName = data.key||'value';
    var rec={
      agent:agentName,
      name:metricName,
      value:data.value
    };
    $scope.agents[agentName][metricName] = rec;
  });
  
  $scope.messageCount = 0;
  
  $scope.sorter = function(thing){
    console.log('thing',thing);
    return thing;
  }
  $scope.agents = {
    'self':{
      'universe':{
        agent:'self',
        name:'universe',
        value:42
      },
      'human':{
        agent:'self',
        name:'human',
        value:46
      }
    }
  };
}
MetricCtrl.$inject = ['$scope', 'socket'];

function LogWellCtrl($scope,socket){
  var maxLines = 25;
  
  $scope.linesToShow=5;
  function logit(category,data){
    $scope.entries.push({stamp:new Date(),category:category,data:data});
    while ($scope.entries.length>maxLines) {
      $scope.entries.shift();
    }
  }
  socket.on('ping', function (data) {
    logit('ping',data);
  });
  
  $scope.entries = [
    {stamp:new Date(),category:'init',data:"I'm in a well"},
    {stamp:new Date(),category:'init',data:"I'm still in a well"},
    {stamp:new Date(),category:'init',data:"Hello, I'm in a well"},
    {stamp:new Date(),category:'init',data:"Are you gonna help ?"},
    {stamp:new Date(),category:'init',data:"Help! I'm still in a well"}
  ];
}
LogWellCtrl.$inject = ['$scope', 'socket'];
