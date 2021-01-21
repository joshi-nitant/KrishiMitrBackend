const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define('Users', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    freezeTableName: true,
    timestamps: false
});



module.exports = Users;