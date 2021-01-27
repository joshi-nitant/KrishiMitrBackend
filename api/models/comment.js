const Sequelize = require('sequelize');
const db = require('../config/database');
const Post = require('./post');
const User = require('./users');

const Comment = db.define('Comment', {
    commentId: {
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
    postId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Post',
            key: 'postId',
        }
    },
    commentDate: {
        type: Sequelize.DATE,
    },
    comment: {
        type: Sequelize.STRING
    },    
}, {
    freezeTableName: true,
    timestamps: false
});

Post.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'postId'
});

User.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});

module.exports = Comment;