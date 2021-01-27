const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

//Get all users User
router.get('/', UserController.get_all_users);

//Get specific User
router.get('/:userId', checkAuth, UserController.get_specific_users);

//Create new user
router.post('/', UserController.register_user);

//Update user
router.patch('/:userId', checkAuth, UserController.update_user);

//Delete exisitng user
router.delete('/:userId', UserController.delete_user);

//login user
router.post('/login', UserController.login_user);



module.exports = router;