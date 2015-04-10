var Hapi = require('hapi');
var config = require('./config/config');

var server = Hapi.createServer('0.0.0.0', config.port, config.hapi.options);

var assets = require('./config/assets');

server.route(require('./config/assets')[config.environment]);
server.route(require('./config/routes'));


server.start(function() {
	console.log('Server Started. \nListening at: ' + server.info.uri);
});

module.exports = server;