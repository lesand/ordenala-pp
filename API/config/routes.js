var requireDir = require('require-directory');
var controller = requireDir(module, '../controllers');

module.exports = [
	{
		method: 'GET',
		path: '/home',
		config: controller.home.index
	}
];

