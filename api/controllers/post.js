const Post = require('../models/post');

exports.get_all_post = (req, res, next) => {
    // const id = req.params.userId;
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
        res.status(500).json({ error: err});
    })
};