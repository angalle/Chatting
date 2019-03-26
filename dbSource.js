var mysql = require('mysql');
var util = require('util');


connection = mysql.createConnection({
	host	:'localhost',
	user	:'root',
	password:'12345'
});

connection.connect(function(err){
	if(!err)
		console.log('DB connection success');
	else
		console.log('DB connection fail',err);
});

schemaName = "chatting";

connection.query('USE '+schemaName,function(err){
	if(!err){
		console.log("USE "+schemaName);
	}else{
		console.log("FAIL USE "+schemaName);
	}
});