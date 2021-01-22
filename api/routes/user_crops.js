const express = require('express');
const router = express.Router();
const UserCropController = require('../controllers/user_crops');

//Get all user crops
router.get('/:userId', UserCropController.get_all_user_crop);

//Create new user
router.post('/', UserCropController.add_user_crop);

//Update user
router.patch('/:userCropId', UserCropController.update_user_crop);

//Delete exisitng user
router.delete('/:userCropId', UserCropController.delete_user_crop);

module.exports = router;