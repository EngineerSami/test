const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, deleteUser , updateUser } = require('../controllers/Controller');

// Routes
router.get('/api/users', getAllUsers);
router.post('/api/users', addUser);
router.delete('/api/users/:id', deleteUser); 
router.put('/api/users/:id', updateUser);

module.exports = router;
