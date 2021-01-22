const Sequelize = require('sequelize');
const db = require('../config/database');
const Crop = require('./crops');
const User = require('./users');

const UserCrop = db.define('UserCrop', {
    userCropId: {
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
    cropId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Crop',
            key: 'cropId',
        }
    },
    cropDate: {
        type: Sequelize.DATE,
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
    freezeTableName: true,
    timestamps: false
});

Crop.hasMany(UserCrop, {
    onDelete: 'CASCADE',
});

User.hasMany(UserCrop, {
    onDelete: 'CASCADE',
});

module.exports = UserCrop;