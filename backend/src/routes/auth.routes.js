const express = require('express');
const authController = require('../controllers/authController');
// const validate = require('../middlewares/validate'); // Example validation middleware

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
