const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Task = require('../../models/Task').default;

/**
 * @route POST api/tasks
 * @desc Submit a task
 * @access Private
 */
router.post('/', auth, (req, res) => {
  const { name, type, description, estimatedDate } = req.body;

  // simple validation
  if (!name) {
    return res.status(400).json({ message: 'task.error.emptyName' });
  }
  if (!type) {
    return res.status(400).json({ message: 'task.error.emptyType' });
  }

  const task = new Task({ name, type, description, estimatedDate, userId: req.user.id });
  task.save().then(task => res.status(200).json({ success: true }));
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
      res.status(200).json(tasks.toJSON({ virtuals: true }));
    });
});

module.exports = router;
