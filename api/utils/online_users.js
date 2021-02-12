const users = [];

// Join user to chat
function userJoin(socketId, userId, userName, groupId) {
    const user = { socketId, userId, userName, groupId };

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(userId) {

    return users.find(user => user.userId === userId);
}

// User leaves chat
function userLeave(socketId) {
    const index = users.findIndex(user => user.socketId === socketId);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};