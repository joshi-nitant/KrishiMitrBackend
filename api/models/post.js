const Sequelize = require('sequelize');
const db = require('../config/database');
const TimeLineEvent = require('./timelive_events');
const UserCrop = require('./user_crops');

const Post = db.define('Post', {
    postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    timeLineId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'TimeLineEvent',
            key: 'timelineId',
        }
    },
    userCropId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'UserCrop',
            key: 'userCropId',
        }
    },
    likeCount: {
        type: Sequelize.INTEGER
    },    
    postDescription: {
        type: Sequelize.STRING
    },
}, 
{
    freezeTableName: true,
    timestamps: false
});

TimeLineEvent.hasMany(Post, {
    onDelete: 'CASCADE',
    foreignKey: 'timeLineId'
});

Post.belongsTo(TimeLineEvent, {
    onDelete: 'CASCADE',
    foreignKey: 'timeLineId'
});

Post.belongsTo(UserCrop,{
    onDelete: 'CASCADE',
    foreignKey: 'userCropId'
});


UserCrop.hasMany(Post, {
    onDelete: 'CASCADE',
    foreignKey: 'userCropId'
});

module.exports = Post;