const express = require('express');
const { createPayment, handleWebhook } = require('../controllers/paymentController'); // Import handleWebhook here
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a payment
router.post('/create-payment', authMiddleware, createPayment);

// Adjust parsing for webhook route
router.post('/webhook', express.urlencoded({ extended: true }), handleWebhook);

module.exports = router;
