const express = require('express');
const router = express.Router();
const TimelineController = require('../controllers/timeline_event');

//Get all timelines of specific crop of specific user
router.get('/:userCropId', TimelineController.get_all_timelines);

//Get specific timeline
router.get('/:timelineId', TimelineController.get_specific_timeline);

//Create new timeline
router.post('/', TimelineController.add_timeline);

//Update timeline
router.patch('/:timelineId', TimelineController.update_timeline);

//Delete exisitng timeline
router.delete('/:timelineId', TimelineController.delete_timeline);

module.exports = router;