var fs = require('fs');

var xml_digester = require("xml-digester");
var digester = xml_digester.XmlDigester({});

query = "";
obj = "";

fs.readFile('./query.xml','utf-8',function(err,data){
	if(err)	console.log(err);
	else{
		digester.digest(data,function(err,result){
			if(err) console.log(err);
			else{
				obj = eval(result.query);
				console.log('All query success load')
			}
		});
	}
});
