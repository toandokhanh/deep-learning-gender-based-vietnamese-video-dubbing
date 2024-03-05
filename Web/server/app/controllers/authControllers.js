const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const User = require('../models/User');
const argon2 = require('argon2');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
dotenv.config();
class AuthController {
    async index(req, res){
        try {
            const user = await User.findById(req.userId).select('-password')
            if (!user)
                return res.status(400).json({ success: false, message: 'User not found' })
            res.json({ success: true, user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
    async register(req, res){
        const {firstname, lastname, username, password} = req.body;
        // Simple validation
        const fullname = firstname + ' ' + lastname;
        if (!username || !password)
            return res
                .status(400)
                .json({ success: false, message: 'Missing username or password' })
        try {
            // Check for existing user
            const user = await User.findOne({ username: username }) // or const user = await User.findOne({ username })
            if (user)
                return res
                    .status(400)
                    .json({ success: false, message: 'Username already taken' })
            // all ok
            const hashedPasswords = await argon2.hash(password);
            const newUser = new User({fullname,username, password: hashedPasswords});
            await newUser.save();
            // Return token
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )
            res.json({
                success: true,
                message: 'User created successfully',
                accessToken
            })
                
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message:'Internal Server Error'});
        }
            
    }
    async login(req, res){
        const {username, password} = req.body;
        // Simple validation
        if (!username || !password)
            return res
                .status(400)
                .json({ success: false, message: 'Missing username or password' })

        try {
            const user = await User.findOne({username});
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: 'Internal username or password' });
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid)
                return res
                    .status(400)
                    .json({ success: false, message: 'Internal username or password' });
            // Return token
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({
                success: true,
                message: 'User logged in successfully',
                accessToken
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message:'Internal Server Error'});
        }
    }
}

module.exports = new AuthController;