const express = require('express');
const router = express.Router();
const Shift = require('../../models/Shift');

// @route     Get api/shifts
// @desc      Get all shifts
// @access    Public
router.get('/', async (req, res) => {
  try {
    const shifts = await Shift.find();
    if (shifts.length === 0) {
      res.send('No shifts logged');
    }
    res.json(shifts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/shifts
// @desc      Create shift
// @access    Public
router.post('/', async (req, res) => {
  const { _user, date, clock_in, clock_out, duration, break_time } = req.body;

  try {
    let shift = await Shift.findOne({ date, _user });
    if (shift) {
      return res.status(400).json({
        errors: [{ msg: 'Shift already logged' }]
      });
    }

    shift = new Shift({
      _user,
      date,
      clock_in,
      clock_out,
      duration,
      break_time
    });

    await shift.save();
    res.json(shift);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
