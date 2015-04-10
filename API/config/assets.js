var production = [{
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: '../frontend/dist'
		}
	}
}];

var development = [{
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: '../frontend/app'
		}
	}
},

{
	method: 'GET',
	path: '/bower_components/{param*}',
	handler: {
		directory: {
			path: '../frontend/bower_components'
		}
	}
},

{
	method: 'GET',
	path: '/styles/{param*}',
	handler: {
		directory: {
			path: '../frontend/.tmp/styles'
		}
	}
}];

module.exports = {
	production: production,
	development: development,
	test: development
};