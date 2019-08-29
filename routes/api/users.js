const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// TODO: Generate a unique userID every time a new user is created (UUID)
// TODO: Check for userId and name before creating new user.

// @route     Get api/users
// @desc      Get users
// @access    Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    //Todo: Case on with there's no user registered yet.
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post('/', async (req, res) => {
  const { name, userId, password } = req.body;

  try {
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: 'User already exists' }]
      });
    }

    user = new User({
      name,
      userId,
      password
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
