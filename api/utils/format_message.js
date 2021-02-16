const moment = require('moment');

function formatMessage(user, text) {
    return {
        "userId": user.userId,
        "userName": user.userName,
        "message": text,
        "groupId": user.groupId,
        "messageTime": new Date(Date.now()).toISOString(),
    };
}

module.exports = formatMessage;