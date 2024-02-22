const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Define your user routes here

// Example route for user registration
router.post('/register', UserController.registerUser);  // Corrected function name

// Example route for user login
router.post('/login', UserController.loginUser);  // Corrected function name

// Add more routes as needed

module.exports = router;
