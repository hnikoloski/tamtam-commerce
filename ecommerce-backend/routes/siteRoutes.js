const express = require('express');
const { createSite } = require('../controllers/siteController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Route to create a new site for the user
router.post('/create', authMiddleware, createSite); // Apply authMiddleware here

module.exports = router;