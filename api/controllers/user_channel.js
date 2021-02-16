const UserChannel = require('../models/user_channel');

exports.get_all_channel_user = (req, res, next) => {
    const id = req.params.groupId;    
    UserChannel.findAll({ where: { groupId: id } }).then(userChannel => {
        const response = {
            count: userChannel.length,
            userChannel: userChannel,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.add_user_channel = (req, res, next) => {    
    console.log(req.body);
    const userChannel = {
        "userId": req.body.userId,
        "groupId": req.body.groupId,        
    }

    UserChannel.create(userChannel).then(data => {
        res.status(200).json({
            message: "User added to channel"
        });        
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

exports.delete_user_channel = (req, res, next) => {
    const id = req.params.userChannelId;

    UserChannel.destroy({ where: { userGroupId: id } }).then(num => {
        if (num == 1) {
            res.status(200).json({
                message: "Deleted Succefully"
            });
        } else {
            res.status(200).json({
                message: "Deleted Unsuccefull. May be the row not found."
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    });
};