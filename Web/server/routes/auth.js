const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const verifyToken = require('../app/middleware/auth');

// @route GET localhost:5000/api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, AuthController.index);
// @route POST localhost:5000/api/auth/register
// @desc Register user
// @access Public
router.post('/register', AuthController.register);
// @route POST localhost:5000/api/auth/login
// @desc login user
// @access Public
router.post('/login', AuthController.login);

router.post('/logout', (req, res) => { res.clearCookie('session_token', { path: '/' }); res.json({ success: true }); });
module.exports = router;
