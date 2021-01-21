const Sequelize = require('sequelize');
const db = require('../config/database');

const Crop = db.define('Crop', {
    cropId: {
        type: Sequelize.INTEGER,
        primaryKey: '1',
        autoIncrement: '1'
    },
    cropName: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

module.exports = Crop;