const Sequelize = require('sequelize');
const db = require('../config/database');

const Channel = db.define('Channel', {
    groupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    groupName: {
        type: Sequelize.STRING
    },
    groupDescription: {
        type: Sequelize.STRING
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Channel;