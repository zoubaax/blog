const express = require('express');
const eventController = require('../controllers/eventController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', eventController.getAll);
router.get('/:id', eventController.getOne);

// Protected Admin routes
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.remove);

module.exports = router;
