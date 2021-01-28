const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');
const UserController = require('../controllers/users');
//Get all user crops
router.get('/', PostController.get_all_post);

router.get('/:cropId', PostController.get_post_on_crop);

//Create new user
router.post('/', PostController.add_post);

// //Update user
// router.patch('/:postId', UserCropController.update_user_crop);

// //Delete exisitng user
// router.delete('/:postId', UserCropController.delete_user_crop);

module.exports = router;