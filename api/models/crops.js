const Sequelize = require('sequelize');
const db = require('../config/database');

const Crop = db.define('Crop', {
    cropId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cropName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Crop;