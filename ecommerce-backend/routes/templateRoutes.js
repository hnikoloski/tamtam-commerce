const express = require('express');
const { getAllTemplates, selectTemplate } = require('../controllers/templateController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Route to get all templates
router.get('/', getAllTemplates);

// Route to select a template for a user, applying authMiddleware
router.post('/select', authMiddleware, selectTemplate);

module.exports = router;
