const Sequelize = require('sequelize');
const db = require('../config/database');
const TimeLineEvent = require('./timelive_events')

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
})

module.exports = Post;