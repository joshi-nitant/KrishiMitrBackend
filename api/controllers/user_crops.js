const UserCrop = require('../models/user_crops');

exports.get_all_user_crop = (req, res, next) => {
    const id = req.params.userId;
    UserCrop.findAll({ where: { userId: id } }).then(userCrops => {
        const response = {
            count: userCrops.length,
            userCrops: userCrops,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.add_user_crop = (req, res, next) => {

    const UserCrop = {
        "userId": req.body.userId,
        "cropId": req.body.cropId,
        "cropDate": req.body.cropDate,
        "cropCity": req.body.cropCity,
        "cropState": req.body.cropState,
        "area": req.body.area,
        "breed": req.body.breed
    }

    UserCrop.create(UserCrop).then(data => { res.status(200).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

exports.update_user_crop = (req, res, next) => {
    const id = req.params.userCropId;

    Users.update(req.body, { where: { userCropId: id } }).then(num => {
        if (num == 1) {
            res.status(200).json({
                message: "Updated Succefully"
            });
        } else {
            res.status(200).json({
                message: "Updation Unsuccefull. May be the row not found."
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    });
};

exports.delete_user_crop = (req, res, next) => {
    const id = req.params.userCropId;

    Users.destroy({ where: { userCropId: id } }).then(num => {
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