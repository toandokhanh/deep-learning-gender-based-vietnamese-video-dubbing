const express = require('express');
const router = express.Router();
const authControllers = require('../app/controllers/authControllers');
const verifyToken = require('../app/middleware/auth');

// @route GET localhost:5000/api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, authControllers.index);
// @route POST localhost:5000/api/auth/register
// @desc Register user
// @access Public
router.post('/register', authControllers.register);
// @route POST localhost:5000/api/auth/login
// @desc login user
// @access Public
router.post('/login', authControllers.login);

module.exports = router;