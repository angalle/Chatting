require('./app')

// upgrade http server to socket.io server
var io = socket.listen(httpServer);
var roomInfo = [];
io.sockets.on('connection', function(socket) {
    socket.emit('connection', {
        type: 'connected'
    });

    socket.on('connection', chatService.connection);
    socket.on('disconnect', chatService.disconnect);
    socket.on('user', chatService.user);
});