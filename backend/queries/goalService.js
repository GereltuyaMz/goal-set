const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals = (req) => {
  return Goal.find({ user: req.user.id });
};

const setGoal = (req, res) => {
  return Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
};

const updateGoal = (req, res) => {
  return Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
}

const deleteGoal = (req, res) => {
  return Goal.findByIdAndDelete(req.params.id);
}

const user = (req) => {
  return User.findById(req.user.id);
}

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  user
};
