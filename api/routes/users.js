const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');


const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid File type'), false);
    }
};

const upload = multer({

    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },

});

//Get all users User
router.get('/', UserController.get_all_users);

//Get specific User
router.get('/:userId', UserController.get_specific_users);

//Create new user
router.post('/', upload.single('userProfilePic'), UserController.register_user);

//Update user
router.patch('/:userId', upload.single('userProfilePic'), UserController.update_user);

//Delete exisitng user
router.delete('/:userId', UserController.delete_user);

//login user
router.post('/login', UserController.login_user);

module.exports = router;