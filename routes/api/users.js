const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

/**
 * @route POST api/users/register
 * @desc Register new user or Update existing one
 * @access Public
 */
router.post('/register', (req, res) => {
  registerUser(req, res);
});

/**
 * @route POST api/users/update
 * @desc Update existing user info
 * @access Private
 */
router.post('/update', auth, (req, res) => {
  updateUser(req, res);
});

module.exports = router;

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // simple validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'global.form.enterAllMandatoryFields' });
  }

  // Check existing user
  if (await User.findOne({ email: req.body.email })) {
    return res.status(400).json({ message: 'user.register.error.alreadyExists' });
  }
  const newUser = new User(req.body);

  // Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;

      newUser.password = hash;
      const user = newUser.save();
      jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;

        sendUserInfo(res, user, token);
      });
    });
  });
};

const updateUser = async (req, res) => {
  const { firstName, lastName } = req.body;

  // simple validation
  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'global.form.enterAllMandatoryFields' });
  }

  await User.updateOne({ _id: req.user.id }, req.body);
  const user = await User.findById(req.user.id).select('-password');
  sendUserInfo(res, user);
};

const sendUserInfo = (res, userModel, other) => {
  const { password, ...user } = userModel.toJSON();
  res.status(200).json({ success: true, user, ...other });
};
