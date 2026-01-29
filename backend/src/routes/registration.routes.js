const express = require('express');
const registrationController = require('../controllers/registrationController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route for people to register
router.post('/', registrationController.register);

// Protected admin route to see registrations
router.get('/:eventId', protect, restrictTo('admin'), registrationController.getRegistrations);

module.exports = router;
