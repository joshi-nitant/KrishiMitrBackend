const Sequelize = require('sequelize');
const db = require('../config/database');
const Crop = require('./crops');
const User = require('./users');

const UserCrop = db.define('UserCrop', {
    userCropId: {
        type: Sequelize.INTEGER,
        primaryKey: '1',
        autoIncrement: '1'
    },
    userId: {
        type: Sequelize.INTEGER
    },
    cropId: {
        type: Sequelize.INTEGER
    },
    cropDate: {
        type: Sequelize.DATE
    },
    cropCity: {
        type: Sequelize.STRING
    },
    cropState: {
        type: Sequelize.STRING
    },
    cropBreed: {
        type: Sequelize.STRING
    },
    cropArea: {
        type: Sequelize.DECIMAL
    },
}, {
    timestamps: false
});

Crop.hasMany(UserCrop, {
    foreignKey: {
        name: 'cropId',
        onDelete: 'CASCADE'
    }
});

User.hasMany(UserCrop, {
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE'
    }
});

module.exports = UserCrop;