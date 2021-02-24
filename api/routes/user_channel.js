const express = require('express');
const router = express.Router();
const UserChannelController = require('../controllers/user_channel');

//Get all user crops
router.get('/:groupId', UserChannelController.get_all_channel_user);

//Create new user
router.post('/', UserChannelController.add_user_channel);

//Delete exisitng user
router.delete('/:userChannelId', UserChannelController.delete_user_channel);

module.exports = router;