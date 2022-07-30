const express = require('express');
const router = express.Router();
const { getGoalsService, setGoalService, updateGoalService, deleteGoalService } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getGoalsService);

router.post('/', protect, setGoalService);

router.put('/:id', protect, updateGoalService);

router.delete('/:id', protect, deleteGoalService);

module.exports = router;
