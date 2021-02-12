const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('../utils/online_users');

const io = require('../../server');
const formatMessage = require('../utils/format_message');

// Run when client connects
io.on('connection', socket => {
    socket.on('joinChannel', ({ userId, userName, groupId }) => {
        userJoin(socket.id, userId, userName, groupId);

        socket.join(groupId);
    });

    // Listen for chatMessage
    socket.on('chatMessage', ({ msg }) => {
        const user = getCurrentUser(socketId);

        socket.to(user.groupId).emit('message', formatMessage(user, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        userLeave(socket.id);
    });
});