function MetricCtrl($scope,socket){
  $scope.agentCount = 0;
  $scope.messageCount = 0;
  $scope.messageCountbyAgent = {
    
  };
  function updateCounts(agentName){
    $scope.messageCount++;
    var mba = $scope.messageCountbyAgent; 
    if (! mba[agentName]) {
      mba[agentName]=0;
      // recalc total agents
      $scope.agentCount = Object.keys($scope.agents).length;
    }
    mba[agentName]=mba[agentName]+1;    
  }
  function storeMessage(agentName,metricName,value){
    updateCounts(agentName);    
    // make a hole!
    var agents = $scope.agents;
    var agent = agents[agentName] = agents[agentName]||{};
    // bury the treasure
    agent[metricName] = {
      agent:agentName,
      name:metricName,
      value:value
    };
  }
  socket.on('metric', function (data) {
    var agentName = data.agent||'anonymous';
    var metricName = data.key||'value';
    var value = data.value;
    storeMessage(agentName,metricName,value);
  });
  
  
  $scope.sorter = function(thing){
    console.log('thing',thing);
    return thing;
  }
  $scope.agents = {};
  storeMessage('self','universe',42);
  storeMessage('self','human',46);
}
MetricCtrl.$inject = ['$scope', 'socket'];

function LogWellCtrl($scope,socket){
  var maxLines = 25;
  
  $scope.linesToShow=5;
  function logit(category,data){
    $scope.entries.unshift({stamp:new Date(),category:category,data:data});
    // trim to size
    $scope.entries.splice(maxLines,1000);
  }
  socket.on('ping', function (data) {
    logit('ping',data);
  });

  $scope.entries = [
    {stamp:new Date(),category:'init',data:"Help! I'm still in a well"},
    {stamp:new Date(),category:'init',data:"Are you gonna help ?"},
    {stamp:new Date(),category:'init',data:"Hello, I'm in a well"},
    {stamp:new Date(),category:'init',data:"I'm still in a well"},
    {stamp:new Date(),category:'init',data:"I'm in a well"}
  ];
}
LogWellCtrl.$inject = ['$scope', 'socket'];
