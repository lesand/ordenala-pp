var q = require("q");


var promise = q.defer();

module.exports = promise.promise;

var collections = require("./collections.js");

var registerCollections = require('./registerCollections.js');		
registerCollections(function(obj)
	{

		Object.keys(obj).forEach(function (c) {
			if(obj.hasOwnProperty(c))
			{
		        collections[obj[c].collectionName] = obj[c];
		    }
    	});

		promise.resolve();
});



