module.exports = function(cb){

	var requireDir = require('require-directory');
	var models = requireDir(module, '../models');
	var _ = require('underscore');

	var setupWaterline = require("./bootstrapWaterline");

	_.each(models, function (model, filename) {
		model.collectionName = model.collectionName || filename;
		model.tableName = (model.tableName && model.tableName.toLowerCase()) || filename.toLowerCase();
		model.identity = model.identity || model.tableName;
    	model.connection = model.connection || "default";
	});

	setupWaterline(
	{
		adapters: {
			"sails-mssql": require("sails-mssql")
		},
		collections: models,
		connections: require("../config/connections")
	}, 
	function waterlineReady (err, ontology) {

		if (err) {
			console.log(err);
			throw err;
		}

		cb(ontology.collections);		
	});
};