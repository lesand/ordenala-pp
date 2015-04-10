
module.exports = function bootstrap( options, cb ) {
	"use strict";

	var _ = require("underscore");
	var Waterline = require('waterline');
	var adapters = options.adapters || {};
	var connections = options.connections || {};
	var collections = options.collections || {};

	_(adapters).each(function (def, identity) {
		def.identity = def.identity || identity;
	});

	var waterline = new Waterline();
	_(collections).each(function (collection) {
		// Extend and load the Waterline collections.
		waterline.loadCollection(Waterline.Collection.extend(collection));
	});

	// Initialize Waterline
	// (and tell it about our adapters)
	waterline.initialize({
		adapters: adapters,
		connections: connections
	}, cb);

	return waterline;
};