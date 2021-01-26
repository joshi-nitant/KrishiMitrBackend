const express = require('express');
const router = express.Router();
const ReplyController = require('../controllers/reply');

//Get all reply
router.get('/:commentId', ReplyController.get_all_comment_reply);

//Create new reply
router.post('/', ReplyController.add_comment_reply);

module.exports = router;