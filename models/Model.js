const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      minlength: [3, 'First name must be at least 3 characters long.'],
      maxlength: [20, 'First name cannot exceed 20 characters.'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      minlength: [3, 'Last name must be at least 3 characters long.'],
      maxlength: [20, 'Last name cannot exceed 20 characters.'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required.'],
      min: [18, 'Age needs to be older than 18.'],
      max: [70, 'Age needs to be younger than 70.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
