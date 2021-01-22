const Crop = require('../models/crops');

exports.get_all_crops = (req, res, next) => {
    Crop.findAll().then(crops => {
        const response = {
            count: crops.length,
            crops: crops,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.add_crop = (req, res, next) => {

    const Crop = {
        "cropName": req.body.cropName,
    }

    Crop.create(Crop).then(data => { res.status(200).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

exports.update_crop = (req, res, next) => {
    const id = req.params.cropId;

    Crop.update(req.body, { where: { cropId: id } }).then(num => {
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

exports.delete_crop = (req, res, next) => {
    const id = req.params.cropId;

    Crop.destroy({ where: { cropId: id } }).then(num => {
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