const Sequelize = require('sequelize');
const db = require('../config/database');
const UserCrop = require('./user_crops');

const TimelineEvent = db.define('TimeLineEvent', {
    timelineId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.INTEGER
    },
    userCropId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'UserCrop',
            key: 'userCropId',
        }
    },
    timelineDate: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false
});

UserCrop.hasMany(TimelineEvent, {
    onDelete: 'CASCADE',
    foreignKey: 'userCropId'
});

TimelineEvent.belongsTo(UserCrop,{
    onDelete: 'CASCADE',
    foreignKey: 'userCropId'
});

module.exports = TimelineEvent;