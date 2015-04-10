var utilityService = module.exports = {};
var _ = require('underscore');

utilityService.contains = function(str, value){
		return str.indexOf(value) > -1;
};

utilityService.isOfType = function(object, type){
		
		//check for null
		if(!object)
		    return false;

		for(var paramName in type.attributes) {

		    if(paramName in object){
		    	var paramType = type.attributes[paramName].type;
		    	var required = type.attributes[paramName].required;

			    var objValue = object[paramName];
		    	paramType = paramType == "integer" ? "number" : paramType;

		    	if(required && objValue === null)
		    		return false;

				//console.log(paramName + ' has a value of ' + objValue + ' and should be a ' + paramType);
		    	if(objValue !== null && typeof objValue != paramType)
		    	{
			    	return false;
			    }
			}
			else
			{
				return false;
			}
		}

		return true;
};

