const moment = require('moment');

function formatMessage(user, text) {
    return {
        "userId": user.userId,
        "userName": user.userName,
        "message": text,
        "time": moment().format('h:mm a')
    };
}

module.exports = formatMessage;