var path = require('path');

module.exports = {
	rootPath: path.normalize(__dirname + '/../..'),
	port: parseInt(process.env.PORT, 10) || 8000,
	environment: process.env.NODE_ENV || 'development',
	
	hapi: {}
};
