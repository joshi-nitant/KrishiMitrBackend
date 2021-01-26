const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment');

//Get all Comment
router.get('/:postId', CommentController.get_all_post_comment);

//Create new Comment
router.post('/', CommentController.add_post_comment);

module.exports = router;