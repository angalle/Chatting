var socket;

$(document).on('ready', function() {
    $('#message-button').click(sendMsg);
    $("#message-input").keydown(function(key) {
        if (key.keyCode == 13) {
            sendMsg();
            $(".j-message").scrollTop(
                document.getElementsByClassName('j-message')[0].scrollHeight);
        }
    });
    $("#nickname").keydown(function(key) {
        if (key.keyCode == 13) {
            join();
            $('#message-input').focus();
        }
    });
    $("#close").click(function(key) {
        socket.disconnect();
    });
});


var rommNum = 100;

function join(index) {
    var name = $('#nickname').val();
    if (name == "") {
        alert('이름을 입력하세요');
        return;
    }

    socket = io.connect('http://localhost:20000/', {
        'forceNew': true
    });
    socket.on('connection', function(data) {
        if (data.type == 'connected') {
            rommNum = rommNum + index;
            socket.emit('connection', content('join', rommNum, name));
            $('.join').css('display', 'none');
            $('.j-footer').css('display', 'block');
        }
    });

    socket.on('self-info', function(data) {
        writeMessage('system', 'system', data.message, data.date);
    });

    socket.on('info', function(data) {
        $('.right-users').html('');
        for(var i = 0 ; i < data.users.length ; i++){
            var html = '<p>'+data.users[i].name+'</p>';
            $('.right-users').append(html);
        }
    });

    socket.on('your-info', function(data) {
        writeMessage('system', 'system', data.message, data.date);
    });

    socket.on('message', function(data) {
        console.log(data);
        writeMessage('other', data.name, data.message, data.date);
        $(".j-message").scrollTop(
            document.getElementsByClassName('j-message')[0].scrollHeight
        );
    });
}

var sendMsg = function() {
    var name = $('#nickname').val();
    var msg = $('#message-input').val();

    socket.emit('user', content('join', rommNum, name, msg));
    //writeMessage('me', name, msg);
    $('#message-input').val('');
}

function writeMessage(type, name, message, date) {
    var html = '<div>{MESSAGE}</div>';
    var printName = '';
    var dateArea = '';
    if (type == 'other') {
        printName = name + ' : ';
    } else if (type == 'me') {
        html = '<div style="font-weight:bolder">{MESSAGE}</div>';
        printName = name + ' : ';
    } else if (type == 'system') {
        html = '<div style="font-weight:bolder">{MESSAGE}</div>';
        printName = name + ' : ';
    }

    if (date) {
        dateArea = ' <span style="font-size:10px">' + date + '</span>';
    }

    html = html.replace('{MESSAGE}', printName + message + dateArea);
    $(html).appendTo('.j-message');
}

function content(type, room, name, msg) {
    return {
        type: type,
        room: room,
        name: name,
        message: msg
    };
}


window.onbeforeunload = function() {
    alert('close');
    socket.disconnect();
};

function close() {
    console.log('close');
    socket.disconnect();
}