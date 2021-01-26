const Comment = require('../models/comment');

exports.get_all_post_comment = (req, res, next) => {
    const id = req.params.postId;
    Comment.findAll({ where: { postId: id } }).then(comments => {
        const response = {
            count: comments.length,
            comments: comments,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.add_post_comment = (req, res, next) => {
    console.log(req.body);
    const comment = {
        "userId": req.body.userId,
        "postId": req.body.postId,
        "commentDate": req.body.commentDate,        
        "comment": req.body.comment,        
    }

    Comment.create(comment).then(data => { res.status(201).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};