/**
 * make Chatting program
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
moment = require('moment');
socket = require('socket.io');
//한번 두면 계속 사용 가능.
db = require('./dbSource');
chat = require('./chat');
chatService = require('./chatService');
query = require('./xmlQuery');
require('moment-timezone');

app = express();
app.use(express.static(path.join(__dirname, 'public')));

moment.tz.setDefault("Asia/Seoul");

httpServer = http.createServer(app).listen(20000, function(req, res) {
    console.log('Socket IO server has been started');
});

module.exports = app;