const { app } = require('./app');
var http = require('http').Server(app);
var io = require('socket.io')(http);
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

        console.log("client connected = " + user.userName);

        userJoin(socket.id, user.userId, user.userName, user.groupId);

        socket.join(user.groupId);
    });

    // Listen for chatMessage
    socket.on('chatMessage', (data) => {
        data = JSON.parse(data);
        console.log(data);
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