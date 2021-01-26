const Sequelize = require('sequelize');
const db = require('../config/database');
const Comment = require('./comment');
const User = require('./users');

const Reply = db.define('Reply', {
    replyId: {
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
    commentId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Comment',
            key: 'commentId',
        }
    },
    replyDate: {
        type: Sequelize.DATE,
    },
    reply: {
        type: Sequelize.STRING
    },    
}, {
    freezeTableName: true,
    timestamps: false
});

Comment.hasMany(Reply, {
    onDelete: 'CASCADE',
    foreignKey: 'commentId'
});

User.hasMany(Reply, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});

module.exports = Reply;