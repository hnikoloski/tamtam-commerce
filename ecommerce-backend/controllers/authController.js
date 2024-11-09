// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Save refresh token to user in database
        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({ accessToken, refreshToken, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Refresh the access token
exports.refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    try {
        const user = await User.findOne({ refreshToken: token });
        if (!user) return res.sendStatus(403);

        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);

            const accessToken = generateAccessToken(user);
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Could not refresh token' });
    }
};
