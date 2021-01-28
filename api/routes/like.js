const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/like');
const PostController = require('../controllers/post')

//Get all Comment
router.get('/:postId', LikeController.get_like_count);

//Create new Comment
router.post('/', LikeController.add_post_like, PostController.update_like_count);

module.exports = router;