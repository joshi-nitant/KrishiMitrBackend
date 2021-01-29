const Like = require('../models/like');
const PostController = require('./post');

exports.get_like_count = (req, res, next) => {
    const id = req.params.postId;
    Like.findAll({ where: { postId: id } }).then(likes => {
        const response = {
            count: likes.length,
            likes: likes         
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.add_post_like = (req, res, next) => {    
    console.log(req.body);
    const like = {
        "userId": req.body.userId,
        "postId": req.body.postId,               
    }
    Like.create(like).then(data => 
    {
        Like.findAll({where: { postId: req.body.postId }}).then(likes=> {
            req.body.likeCount = likes.length;
            console.log(req.body.likeCount);
            next();
        }).catch(err=> {
            res.status(500).json({
                error: err,
            });
        })        
    }
    ).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

exports.delete_post_like = (req, res, next) => {    
    const id = req.params.likeId;
    console.log(req.bodyFields);
    Like.destroy({ where: { likeId: id } }).then(num => {
        if (num == 1) {
            // res.status(200).json({
            //     message: "Deleted Succefully"
            // });
            console.log(num);
            Like.findAll({where: { postId: req.body.postId }}).then(likes=> {
                req.body.likeCount = likes.length;
                console.log(req.body.likeCount);
                next();
            }).catch(err=> {
                res.status(500).json({
                    error: err,
                });
            })   
        } else {
            res.status(200).json({
                message: "Deleted Unsuccefull. May be the row not found."
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
            message: "fail in like.js"
        })
    });
};