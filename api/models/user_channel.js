const Sequelize = require('sequelize');
const db = require('../config/database');
const Group = require('./channel');
const User = require('./users');
const UserCrop = require('./user_crops');

const UserChannel = db.define('UserChannel', {
    userGroupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'userId',
        }
    },
    groupId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Channel',
            key: 'groupId',
        }
    },
}, {
    freezeTableName: true,
    timestamps: false
});

Group.hasMany(UserChannel, {
    onDelete: 'CASCADE',
    foreignKey: 'groupId'
});

User.hasMany(UserChannel, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});

module.exports = UserChannel;