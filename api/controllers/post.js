const sequelize = require('../config/database');
const Post = require('../models/post');
const UserCrop = require('../models/user_crops');

exports.get_all_post = (req, res, next) => {
    const id = req.params.id;
    // const id = req.params.userId;
    Post.findAll({ include: [{ model: UserCrop, as: 'usercrop' }], where: { cropId: id } }).then(Posts => {
        const response = {
            count: Posts.length,
            Posts: Posts,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });


    Post.findAll({ where: { userCropId: { $in: sequelize.literal(`select userCropId from UserCrop where cropId = ${id}`) } } });
    Post.findAll().then(Posts => {
        const response = {
            count: Posts.length,
            Posts: Posts,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.add_post = (req, res, next) => {
    console.log(req.body);
    const post = {
        "timeLineId": req.body.timeLineId,
        "likeCount": req.body.likeCount,
        "postDescription": req.body.postDescription,
        "userCropId": req.body.userCropId,
    }

    Post.create(post).then(data => { res.status(201).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};