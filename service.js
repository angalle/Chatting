var util = require('util');
var crypto = require('crypto');

/* 이메일로 조회한 회원의 정보를 비교한다. */
exports.LOGIN_USER = function(req,res){
	console.log('hello');
	var PARAM 				= req.body;

	var LOGIN_USER 					= "LOGIN_USER";
	var MEMBER_EMAIL 				= PARAM.MEMBER_EMAIL;
	var MEMBER_PW 					= PARAM.MEMBER_PW;


	LOGIN_USER = util.format(obj[LOGIN_USER] ,MEMBER_EMAIL);

	connection.query(LOGIN_USER ,function(err,rows,fields){
		if(err){
			res.send(JSON.stringify({Result:"false"}));
			console.log('Err while performing query.',err);
		}else{
			console.log(rows)
			res.setHeader('Content-Type','application/json');
			console.log(rows.length)
			if(rows == null || rows.length == 0){
				res.send(JSON.stringify({Result : "false"}));
			}else{
				var decipher = crypto.createDecipher('aes256','password');
				decipher.update(rows[0].MEMBER_PW,'hex','ascii');
				var decipherd = decipher.final('ascii');

				if( MEMBER_PW == decipherd ){
					res.send(JSON.stringify({Result : "true", data : rows}));
				}else{
					res.send(JSON.stringify({Result : "false"}));
				}
			}
		}
	});
}