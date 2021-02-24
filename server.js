const { app } = require('./app');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const UserChannel = require('./api/models/user_channel');
const Messages = require('./api/models/message');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./api/utils/online_users');
const formatMessage = require('./api/utils/format_message');


const port = process.env.PORT || 3000;


// Run when client connects
io.on('connection', socket => {
    console.log("connected a client");
    socket.on('joinChannel', (user) => {
        user = JSON.parse(user);
        console.log("user Id = " + user.userId);
        console.log("client connected = " + user.userName);
        UserChannel.findAll({ where: { userId: user.userId } }).then(channels => {
            channels.forEach((channel) => {
                console.log(channel.groupId);
                userJoin(socket.id, user.userId, user.userName, channel.groupId);
                socket.join(channel.groupId);
            });

        }).catch(err => {
            console.log(err);
        });

    });

    // Listen for chatMessage
    socket.on('chatMessage', (data) => {
        data = JSON.parse(data);
        console.log(data);
        const Message = {
            "senderId": data.userId,
            "groupId": data.groupId,
            "message": data.message,
            "messageDate": data.messageTime
        }
        Messages.create(Message).then(data => {
            console.log("Message inserted");
        }).catch(err => {
            console.log(err);
        });
        socket.to(data.groupId).emit('message', JSON.stringify(formatMessage(data, data.message)));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        userLeave(socket.id);
    });
});
////////////////////////

http.listen(port, function() {
    console.log(`listening on *:${port}`);
});


//server.js
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// try {

//     io.on('connection', function(socket) {
//         console.log('connection');

//         socket.on('CH01', function(from, msg) {
//             console.log('MSG', from, ' saying ', msg);
//         });

//     });

//     http.listen(3000, function() {
//         console.log('listening on *:3000');
//     });
// } catch (e) {
//     console.log(e);
// }