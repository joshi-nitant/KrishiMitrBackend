const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channel');

//Get all channels
router.get('/', ChannelController.get_all_channel);

//Add user to channel
router.post('/:channelId', ChannelController.join_channel);

//Leave channel
router.patch('/:channelId', ChannelController.leave_channel);

module.exports = router;