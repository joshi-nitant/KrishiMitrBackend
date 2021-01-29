const sequelize = require('../config/database');
// <<<<<<< master

const Post = require('../models/post');
const UserCrop = require('../models/user_crops');
const TimelineEvent = require('../models/timelive_events');
const checkAuth = require('../middleware/check-auth');

// =======
// const Post = require('../models/post');
// const UserCrop = require('../models/user_crops');
// >>>>>>> master

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

// <<<<<<< master
exports.get_post_on_crop = (req, res, next) => {

    const id = req.params.cropId;
    Post.findAll({
        include: [{
            // model: UserCrop, where: 
            // {
            //     cropId:id                     
            // } ,




            model: TimelineEvent, include: [{
                model: UserCrop,
                where: {
                    cropId: id
                },
                required:true  
            },],
            required:true  
        }
        ],

    }).then(postTimeline => {
        Post.findAll({
            include: [{
                model: UserCrop, where: 
                {
                    cropId:id                     
                } ,
                required:true    
    
            }
            ],
    
        }).then(postUseCrop=>{
            
           
            var bigPost = postTimeline.map((post)=>{
    
                return {
                    postId:post.postId,
                    postDecription:post.postDescription,
                    likeCount:post.likeCount,
                    title:post.TimeLineEvent.title,
                    userId: post.TimeLineEvent.UserCrop.userId,
                    postDate:post.TimeLineEvent.timelineDate,
                    isUserCrop: 0
                }

            });

            var bigPost2 = postUseCrop.map((post)=>{
                return {
                    postId:post.postId,
                    postDecription:post.postDescription,
                    likeCount:post.likeCount,
                    title:post.UserCrop.breed,
                    userId: post.UserCrop.userId,
                    postDate: post.UserCrop.cropDate,
                    isUserCrop: 1
                }
            });
            bigPost = bigPost.concat(bigPost2);
            console.log(bigPost);
        
            const allPosts = {
                count:bigPost.length,
                post: bigPost
            }
            res.status(200).json(allPosts)
            
        }).catch(err=>{
            console.log(err);
        })

    
       
    }).catch(err => {
        console.log(err);
    });

}

// exports.add_post = (req, res, next) => {
//     console.log("here");
//     console.log(req.body)
// =======
exports.add_post = (req, res, next) => {
    console.log(req.body);
// >>>>>>> master
    const post = {
        "timeLineId": req.body.timeLineId,
        "likeCount": 0,
        "postDescription": req.body.postDescription,
        "userCropId": req.body.userCropId,
    }

    Post.create(post).then(data => { res.status(201).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

exports.update_like_count = (req, res, next) => {
    const id = req.body.postId;
    const post = {
        'likeCount': req.body.likeCount
    };
    Post.findAll()
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
            message: "fail in update",
        })
    });
};