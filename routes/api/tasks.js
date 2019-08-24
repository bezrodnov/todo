const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Task = require('../../models/Task');

/**
 * @route GET api/tasks
 * @dec Fetches tasks for the current user
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id })
    .select('-userId')
    .sort({ creationDate: 'desc' });

  res.status(200).json(tasks.map(task => task.toJSON()));
});

/**
 * @route POST api/tasks
 * @desc Create Task
 * @access Private
 */
router.post('/', auth, async (req, res) => {
  const { name, type, description, estimatedDate, notes } = req.body;

  // simple validation
  if (!name) {
    return res.status(400).json({ message: 'task.errors.emptyName' });
  }
  if (!type) {
    return res.status(400).json({ message: 'task.errors.emptyType' });
  }

  let task = new Task({ name, type, description, estimatedDate, notes, userId: req.user.id });
  task = await task.save();
  res.status(200).json({
    success: true,
    task: task.toJSON(),
  });
});

/**
 * @route POST api/tasks/trash
 * @desc Mark Task as a Trash
 * @access Private
 */
router.post('/trash', auth, async (req, res) => {
  const task = await Task.findById(req.body.id);
  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: 'task.errors.NoTaskToMoveToTrash' });
  }
  task.type = 'trash';
  await task.save();
  res.status(200).json({ success: true });
});

/**
 * @route DELETE api/tasks
 * @desc Delete Task
 * @access Private
 */
router.delete('/', auth, async (req, res) => {
  const task = await Task.findById(req.body.id);
  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: 'task.errors.NoTaskToDelete' });
  }
  await task.deleteOne();
  res.status(200).json({ success: true });
});

module.exports = router;
