const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, googleLogin } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.get('/profile', protect, getUserProfile);

module.exports = router;
