/*****************************************************************************

USAGE:  node extractModels.js [-d DBNAME] [ModelName1 ModelName2 ...]

database credentials pulled from connections.js file default connection

*****************************************************************************/

"use strict";

var sql;
try {
	sql = require("mssql");
} catch (err) {
	sql = require("sails-mssql/node_modules/mssql")
}
var Q = require("q");
var fs = require("fs");

var argv = require("minimist")(process.argv.slice(2));

//console.log(argv); process.exit();

var connections= require("./config/connections.js");
var config = connections.default;
config.server = config.host;
config.database = argv.d || config.database;

var fileHeader = "/**\n *\n * {{fileName}}.js\n *\n */\n\nmodule.exports = ";

var getType = function(t) {
    switch(t) {
        case "varchar":
        case "nvarchar":
        case "char":
        case "nchar":
            return "string";
        case "bit":
            return "boolean";
        case "int":
        case "smallint":
        case "tinyint":
            return "integer";
        case "money":
            return "float";
        default:
            return t;
    }
};

var extractAndWrite = function(t, sql) {
    var tables = t;
    var request = new sql.Request();

    tables.forEach(function (tableName) {
        console.log("Extracting " + tableName + " from " + config.database);
        request.query("SELECT * \
            FROM INFORMATION_SCHEMA.COLUMNS \
            WHERE TABLE_SCHEMA = 'dbo' AND TABLE_CATALOG = '" + config.database + "' AND TABLE_NAME = '" + tableName + "'", function (err, r) {
                if(err) {
                    console.error(err);
                    return;
                }
                var o = {};

                o.tableName = tableName.toLowerCase();
                o.collectionName = tableName;
                o.adapter = "sails-mssql";
                o.connection = argv.c || "default";
                o.autoPK = false;
                o.autoCreatedAt = false;
                o.autoUpdatedAt = false;
                o.migrate = "safe";
                o.attributes = r.reduce(function (obj, c) {
                    var co = {};
                    co.type = getType(c["DATA_TYPE"]);
                    if (co.type === "string") {
                        co.size = c["CHARACTER_MAXIMUM_LENGTH"];
                    }
                    if (co.type === "uniqueidentifier") {
                        co.size = 36;
                        co.type = "string";
                        co.uuid = true;
                    }
                    //TODO: Detect Primary Key
                    co.required = (c["IS_NULLABLE"] !== "YES");
                    obj[c["COLUMN_NAME"]] = co;
                    return obj;
                }, {});
                fs.writeFileSync(tableName + ".js", fileHeader.replace("{{fileName}}", tableName) + JSON.stringify(o,null, 4) + ";\n");

            });
    });
    
};


sql.connect(config, function(err) {

    if (err) {
        console.log(err);
        process.exit(1);
    }
    if (!argv._) {
        var request = new sql.Request();

        var tableP = Q.defer();
        request.query("select TABLE_NAME \
           FROM INFORMATION_SCHEMA.TABLES \
           WHERE TABLE_SCHEMA = 'dbo' AND TABLE_CATALOG = '" + config.database + "' \
           ORDER BY Table_NAME", function (err, r) {
            if (err) {
                console.error(err);
                tableP.reject();
                process.exit(1);
            }
            var tables = r.map(function(a) { return a["TABLE_NAME"];});
            tableP.resolve(tables);
        });

        if (!fs.existsSync("models")) {
            fs.mkdirSync("models");
        }

        tableP.promise.then(function(t) { extractAndWrite(t, sql); });
    } else {
        extractAndWrite(argv._, sql);
    }
});