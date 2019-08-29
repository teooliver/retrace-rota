// name;
// clock_in;
// clock_out;
// date;
// duration;
// break_time;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  clock_in: {
    type: Date,
    required: true
  },
  clock_out: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  break_time: {
    type: Number,
    required: true
  }
});

module.exports = Shift = mongoose.model('shift', ShiftSchema);
