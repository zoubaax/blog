const express = require('express');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register-admin', authController.registerAdmin); // NOTE: In prod, protect this or remove it!

// Example of a protected route
router.get('/me', protect, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});

module.exports = router;
