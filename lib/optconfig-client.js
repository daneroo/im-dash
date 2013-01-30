

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
  // default : 'agent-'+new Date().getTime(),
  default : 'anonymous',
  describe: 'e.g. -n <agent-name>'
}).options('server', {
  alias: 's',
  default : 'http://localhost:8080',
  describe: 'e.g. -s http://imetrical-dash.jit.su/'
  // var endpoint = 'http://dash.imetrical.com/'
  // var endpoint = 'http://im-dash.cloudfoundry.com/';
  // var endpoint = 'http://im-dash.aws.af.cm/';
}).options('help', {
  alias: 'h',
  describe: 'Show this message'
});

// overrides
var shortcuts = {
  imetrical: 'http://dash.imetrical.com:80/',
  jitsu:'http://imetrical-dash.jit.su:80/',
  cloudfoundry:'http://im-dash.cloudfoundry.com:80/',
  appfog:'http://im-dash.aws.af.cm:80/'
}
for (shortcut in shortcuts){
  console.log('adding ',shortcut);
  options = options.options(shortcut,{
    describe: 'shortcut for -s '+shortcuts[shortcut]
  });
}

options = options.argv;

// apply override
for (shortcut in shortcuts){
  if (options[shortcut]){
    options.server=shortcuts[shortcut];
  }
}
if (options.help) {
  require('optimist').showHelp();
  process.exit();
}

module.exports = options;
