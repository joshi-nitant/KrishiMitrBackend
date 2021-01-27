const Reply = require('../models/reply');

exports.get_all_comment_reply = (req, res, next) => {
    const id = req.params.commentId;
    Reply.findAll({ where: { commentId: id } }).then(replies => {
        const response = {
            count: replies.length,
            replies: replies,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.add_comment_reply = (req, res, next) => {
    console.log(req.body);
    const reply = {
        "userId": req.body.userId,
        "commentId": req.body.commentId,
        "replyDate": req.body.replyDate,        
        "reply": req.body.reply,        
    }

    Reply.create(reply).then(data => { res.status(201).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};