const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define('Users', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: '1',
        autoIncrement: '1'
    },
    userName: {
        type: Sequelize.STRING
    },
    userContactNumber: {
        type: Sequelize.STRING
    },

    userState: {
        type: Sequelize.STRING
    },

    userCity: {
        type: Sequelize.STRING
    },

    userProfileUrl: {
        type: Sequelize.STRING
    },

    userType: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});



module.exports = Users;