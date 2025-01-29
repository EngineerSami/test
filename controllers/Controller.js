const User = require('../models/Model');

const getAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Server Error', error: err.message || err });
    });
};

const addUser = (req, res) => {
  const { firstName, lastName, age } = req.body;

  User.create({ firstName, lastName, age })
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ message: 'Validation Error', errors });
      }
      console.error('Error adding user:', err);
      res.status(500).json({ message: 'Server Error', error: err.message || err });
    });
};

// Update user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  // We rely on Mongoose validation instead of manually checking for fields
  User.findByIdAndUpdate(id, { firstName, lastName, age }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      // Handle Mongoose validation errors
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ message: 'Validation Error', errors });
      }
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server Error', error: err.message || err });
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully', user: deletedUser });
    })
    .catch((err) => {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Server Error', error: err.message || err });
    });
};

module.exports = { getAllUsers, addUser, deleteUser, updateUser };
