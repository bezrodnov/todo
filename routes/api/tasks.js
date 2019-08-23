const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Task = require('../../models/Task');

/**
 * @route POST api/tasks
 * @desc Create Task
 * @access Private
 */
router.post('/', auth, (req, res) => {
  const { name, type, description, estimatedDate, notes } = req.body;

  // simple validation
  if (!name) {
    return res.status(400).json({ message: 'task.errors.emptyName' });
  }
  if (!type) {
    return res.status(400).json({ message: 'task.errors.emptyType' });
  }

  const task = new Task({ name, type, description, estimatedDate, notes, userId: req.user.id });
  task.save().then(task =>
    res.status(200).json({
      success: true,
      task: task.toJSON(),
    })
  );
});

/**
 * @route GET api/tasks
 * @dec Fetches tasks for the current user
 * @access Private
 */
router.get('/', auth, (req, res) => {
  Task.find({ userId: req.user.id })
    .select('-userId')
    .sort({ creationDate: 'desc' })
    .then(tasks => {
      res.status(200).json(tasks.map(task => task.toJSON()));
    });
});

module.exports = router;
