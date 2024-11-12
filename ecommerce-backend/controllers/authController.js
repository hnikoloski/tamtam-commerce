const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Save refresh token in the user document
        user.refreshToken = refreshToken;
        await user.save();

        // Respond with tokens and user data
        res.status(201).json({ accessToken, refreshToken, user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error during registration' });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Update user with new refresh token
        user.refreshToken = refreshToken;
        await user.save();

        // Respond with tokens and user data
        res.json({ accessToken, refreshToken, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error during login' });
    }
};

// Refresh the access token using a valid refresh token
exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        // Find the user with the matching refresh token
        const user = await User.findOne({ refreshToken: token });
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Log the refresh token and secret for debugging
        console.log('Received refresh token:', token);
        console.log('JWT_REFRESH_SECRET from .env:', process.env.JWT_REFRESH_SECRET);

        // Verify the refresh token
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                console.error('Error verifying refresh token:', err);
                return res.status(403).json({ message: 'Failed to verify refresh token' });
            }

            // Generate a new access token
            const accessToken = generateAccessToken(user);
            res.json({ accessToken });
        });
    } catch (error) {
        console.error('Error during token refresh:', error);
        res.status(500).json({ message: 'Internal server error during token refresh' });
    }
};
