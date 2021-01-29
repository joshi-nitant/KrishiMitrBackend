const Sequelize = require('sequelize');
const db = require('../config/database');
const Post = require('./post');
const User = require('./users');

const Like = db.define('Like', {
    likeId: {
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
}, {
    freezeTableName: true,
    timestamps: false
});

Post.hasMany(Like, {
    onDelete: 'CASCADE',
    foreignKey: 'postId'
});

User.hasMany(Like, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});

module.exports = Like;