const Sequelize = require('sequelize');
const db = require('../config/database');
const UserCrop = require('./user_crops');

const TimelineEvent = db.define('UserCrop', {
    timelineId: {
        type: Sequelize.INTEGER,
        primaryKey: '1',
        autoIncrement: '1'
    },
    title: {
        type: Sequelize.INTEGER
    },
    userCropId: {
        type: Sequelize.INTEGER
    },
    timelineDate: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false
});

UserCrop.hasMany(TimelineEvent, {
    foreignKey: {
        name: 'timelineId',
        onDelete: 'CASCADE'
    }
});

module.exports = TimelineEvent;