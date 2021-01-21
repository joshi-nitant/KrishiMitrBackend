const express = require('express');
const router = express.Router();
const { pool } = require('../../app');
const UserController = require('../controllers/users');

//Get all users
router.get('/', UserController.get_all_users);

//Get specific User
router.get('/:userId', UserController.get_specific_users);

//Create new user
router.post('/', UserController.add_user);

//Update user
router.patch('/:userId', UserController.update_user);

//Delete exisitng user
router.delete('/:userId', UserController.delete_user);

module.exports = router;