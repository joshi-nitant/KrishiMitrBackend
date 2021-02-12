const Channel = require('../models/channel');
const UserGroups = require('../models/user_channel');
const { Op } = require("sequelize");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('../utils/online_users');

exports.get_all_channel = (req, res, next) => {
    Channel.findAll().then(channels => {
        const response = {
            count: channels.length,
            channels: channels,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
};

exports.join_channel = (req, res, next) => {
    const channelId = req.params.channelId;
    const userId = req.body.userId;
    const UserGroup = {
        groupId: channelId,
        userId: userId
    };
    UserGroups.create(UserGroup).then(data => { res.status(201).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
};

exports.leave_channel = (req, res, next) => {
    const channelId = parseInt(req.params.channelId);
    const userId = req.body.userId;

    UserGroups.destroy({
        where: {
            [Op.and]: [
                { userId: userId },
                { groupId: channelId }
            ],
        }
    }).then(data => { res.status(200).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
};