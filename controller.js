var service = require('./service.js');

app.post('/login',service.LOGIN_USER);

app.get('/login',function(){
	console.log('hello');
});