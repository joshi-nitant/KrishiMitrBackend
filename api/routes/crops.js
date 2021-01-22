const express = require('express');
const router = express.Router();
const CropController = require('../controllers/crops');

//Get all crops
router.get('/', CropController.get_all_crops);

//Create new crop
router.post('/', CropController.add_crop);

//Update crop
router.patch('/:cropId', CropController.update_crop);

//Delete exisitng crop
router.delete('/:cropId', CropController.delete_crop);

module.exports = router;