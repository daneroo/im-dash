function MetricCtrl($scope,socket){
  $scope.agentCount = 0;
  $scope.messageCount = 0;
  $scope.messageCountbyAgent = {};
  $scope.speed = {};
  $scope.adjustSpeed = function(agent,incr){
    socket.emit('control',{agent:agent, key:'speed',value:incr});
  }
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
    // bury the treasure - but avoid replacing the object if possible
    var metric = agent[metricName];
    if (metric) {
      metric.value=value;
    } else {
      agent[metricName] = {
        agent:agentName,
        name:metricName,
        value:value
      };
    }
  }
  socket.on('ack', function (data) {
    if (data && data.agent && data.key==='speed'){
      $scope.speed[data.agent]=data.value;
    }
  });
  socket.on('metric', function (data) {
    var agentName = data.agent||'anonymous';
    var metricName = data.key||'value';
    var value = data.value;
    storeMessage(agentName,metricName,value);
  });
  
  
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
  socket.on('ack', function (data) {
    if (data && data.agent && data.key==='speed'){
      logit('speed','set to '+data.value+' for '+data.agent);
    }
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

function ChordCtrl($scope,socket){
  var which=0;
  var fibs = [
  [2,3,5,8,13,21],
  [3,5,8,13,21,34]
  ];
  $scope.data=fibs[which];

  $scope.recentMetrics = 0;
  $scope.totalMetrics = 0;

  socket.on('activity', function (data) {
    // console.log('got',data);
    $scope.recentMetrics = data.recentMetrics+Math.random()*0.0001;
    $scope.totalMetrics = data.totalMetrics;

  });

  $scope.toggle = function() {
    which = (which+1)%2;
    $scope.data=fibs[which];
  }

}
ChordCtrl.$inject = ['$scope', 'socket'];

