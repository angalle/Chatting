require('./app')

exports.connection = function (data) {
    if (data.type == 'join') {

        socket.join(data.room);
        var user = {
            room: data.room,
            name: data.name,
            socketId: socket.id,
        }
        socket.user = user;
        roomInfo.push(user);

        roomInfo = roomInfo.filter(function(item){
            return item.room === data.room;
        });


        var data = {
            message: '채팅방에 오신 것을 환영합니다.',
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        //나에게만
        io.to(user.socketId).emit('self-info', data);

        var data = {
            users: roomInfo,
        }
        //방 전체
        io.to(user.room).emit('info', data);

        //나를 제외한 모두
        socket.broadcast.to(user.room).emit('your-info', {
            message: user.name + '님이 접속하셨습니다.',
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        });
    }
}

exports.disconnect = function () {
    var userInfo = socket.user;

    roomInfo = roomInfo.filter(function(item){
        return item.socketId !== userInfo.socketId;
    });

    console.log(roomInfo);

    socket.broadcast.to(socket.user.room).emit('system', {
        message: socket.user.name + '님이 나가셨습니다.'
    });
    io.sockets.emit('user disconnected');
}

exports.user = function (data) {
    var room = socket.user.room;
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(socket.user);
    data.date = date;
    //socket.broadcast.to(room).emit('message', data);
    io.to(room).emit('message', data);
    /*console.log(socket.adapter.rooms);*/
    /*console.log(socket.adapter.rooms[room].length);
    console.log(socket.adapter.rooms[room].sockets);*/
}