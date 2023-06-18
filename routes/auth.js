const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup
router.get('/signup', authController.signupForm);
router.post('/signup', authController.signup);

// Login
router.get('/login',authController.loginForm)
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
