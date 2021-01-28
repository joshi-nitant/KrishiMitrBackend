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
    console.log("here");
    console.log(req.body)
    const post = {        
        "timeLineId": req.body.timeLineId,
        "likeCount": 0,
        "postDescription": req.body.postDescription,
        "userCropId": req.body.userCropId,
    }

    Post.create(post).then(data => { res.status(201).json(data); }).catch(err => {
        console.log(err);        
        res.status(500).json({ error: err});
    })
};

exports.update_like_count = (req, res, next) => {
    const id = req.body.postId;
    const post =  {
        'likeCount':req.body.likeCount
    };

    Post.update(post, { where: { postId: id } }).then(num => {
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