const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../queries/goalService');

// @desc  Get goal
// @route GET /api/goals
// @access private
const getGoalsService = asyncHandler(async (req, res) => {
  const goals = await getGoals(req);
  res.status(200).json(goals);
});

// @desc  Create goal
// @route POST /api/goals
// @access private
const setGoalService = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('add text field');
  }

  const goal = await setGoal(req, res);

  res.status(200).json(goal);
});

// @desc  Update goal
// @route PUT /api/goals/:id
// @access private
const updateGoalService = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);
  // check user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // check logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await updateGoal(req, res);
  res.status(200).json(updatedGoal);
});

// @desc  Delete goal
// @route DELETE /api/goals/:id
// @access private
const deleteGoalService = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);
  // check user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // check logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const deletedGoal = await deleteGoal(req, res);
  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoalsService,
  setGoalService,
  updateGoalService,
  deleteGoalService,
};
