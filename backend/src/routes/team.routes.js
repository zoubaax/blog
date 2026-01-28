const express = require('express');
const teamController = require('../controllers/teamController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', teamController.getAll);
router.get('/:id', teamController.getOne);

// Protected Admin routes
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', teamController.create);
router.put('/:id', teamController.update);
router.delete('/:id', teamController.remove);

module.exports = router;
