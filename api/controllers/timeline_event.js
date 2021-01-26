const TimelineEvent = require('../models/timelive_events');

exports.get_all_timelines = (req, res, next) => {
    const userCropId = req.params.userCropId;
    TimelineEvent.findAll({ where: { userCropId: userCropId } }).then(timelines => {
        const response = {
            count: timelines.length,
            timelines: timelines,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.get_specific_timeline = (req, res, next) => {
    const id = req.params.timelineId;
    TimelineEvent.findByPk(id).then(timeline => {
        const response = {
            "timeline": timeline
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
        });
    });
};

exports.add_timeline = (req, res, next) => {

    const Timeline = {
        "title": req.body.title,
        "description": req.body.description,
        "timelineDate": req.body.timelineDate,
        "userCropId": req.body.userCropId
    }

    TimelineEvent.create(Timeline).then(data => { res.status(201).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

exports.update_timeline = (req, res, next) => {
    const id = req.params.timelineId;

    TimelineEvent.update(req.body, { where: { timelineId: id } }).then(num => {
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

exports.delete_timeline = (req, res, next) => {
    const id = req.params.timelineId;

    TimelineEvent.destroy({ where: { timelineId: id } }).then(num => {
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