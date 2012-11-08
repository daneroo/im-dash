

var optimist = require('optimist');

var options = optimist.options('verbose', {
  alias: 'v',
  default : 0,
  describe: 'set logging level...(should count multiple invocations)'
})  .options('host', {
  alias: 'h',
  default : (process.env.VCAP_APP_HOST || '0.0.0.0'|| 'localhost'),
  describe: 'bind to this address as host'
})  .options('port', {
  alias: 'p',
  default : (process.env.VMC_APP_PORT || 8080),
  describe: 'bind to this port'
}).options('help', {
  alias: 'h',
  describe: 'Show this message'
}).argv;

if (options.help) {
  optimist.showHelp();
  process.exit();
}

module.exports = options;
