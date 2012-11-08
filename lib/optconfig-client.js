

// could add ioOpts
/*
var ioOptions = {
  // 'try multiple transports':false,
  // transports:['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
  // transports:['xhr-polling']
};
*/

var options = require('optimist').options('name', {
  alias: 'n',
  default : 'agent-'+new Date().getTime(),
  describe: 'e.g. -n <unique-agent-name>'
}).options('server', {
  alias: 's',
  default : 'http://localhost:8080',
  describe: 'e.g. -s http://imetrical.dash.jit.su/'
  // var endpoint = 'http://dash.imetrical.com/'
  // var endpoint = 'http://im-dash.cloudfoundry.com/';
  // var endpoint = 'http://im-dash.aws.af.cm/';
}).options('help', {
  alias: 'h',
  describe: 'Show this message'
}).argv;

if (options.help) {
  require('optimist').showHelp();
  process.exit();
}

module.exports = options;
