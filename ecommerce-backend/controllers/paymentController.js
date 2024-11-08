const { createMollieClient } = require('@mollie/api-client'); // Importing createMollieClient
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY }); // Initialize with API key
const User = require('../models/User');
const Payment = require('../models/Payment');
const winston = require('winston');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'server161.web-hosting.com',  // Namecheap’s SMTP server
    port: 465,                          // Secure SMTP port for SSL
    secure: true,                       // Use true for SSL
    auth: {
        user: process.env.EMAIL_USER,   // Your email address, e.g., testing@hnikoloski.com
        pass: process.env.EMAIL_PASS,   // Your email password
    },
});

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

// Create a new payment
exports.createPayment = async (req, res) => {
    const { amount, description } = req.body;
    const userId = req.user.id;

    try {
        // Create payment with Mollie
        const payment = await mollieClient.payments.create({
            amount: { currency: 'EUR', value: amount.toFixed(2) },
            description,
            redirectUrl: `${process.env.BASE_URL}/success`, // Use your ngrok URL with `/success` path
            webhookUrl: `${process.env.BASE_URL}/api/payments/webhook`, // Webhook URL
            metadata: { userId },
        });

        // Save payment to the database
        const newPayment = new Payment({
            userId,
            paymentId: payment.id,
            amount,
            currency: 'EUR',
            status: 'pending', // Initially pending
            description,
        });
        await newPayment.save();

        res.status(200).json({ paymentId: payment.id, checkoutUrl: payment.getCheckoutUrl() });
    } catch (error) {
        logger.error("Error creating payment:", error);
        res.status(500).json({ message: 'Payment creation failed' });
    }
};

// Handle webhook for payment status updates
exports.handleWebhook = async (req, res) => {
    const paymentId = req.body.id;

    try {
        const payment = await mollieClient.payments.get(paymentId);

        // Update payment status in the database
        await Payment.findOneAndUpdate({ paymentId }, { status: payment.status, updatedAt: Date.now() });

        if (payment.status === 'paid') {
            const userId = payment.metadata.userId;
            await User.findByIdAndUpdate(userId, { subscriptionStatus: 'active' });
            logger.info(`Payment successful for ID: ${payment.id}`);

            // Email notification (optional)
            const user = await User.findById(userId);
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Payment Successful',
                text: 'Thank you for your payment! Your subscription is now active.',
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    logger.error("Error sending email:", err);
                } else {
                    logger.info("Email sent: " + info.response);
                }
            });
        }

        res.status(200).send('Webhook processed');
    } catch (error) {
        logger.error("Error handling webhook:", error);
        res.status(500).send('Webhook processing failed');
    }
};


exports.getPaymentHistory = async (req, res) => {
    const userId = req.user.id; // Assuming `user` is populated by auth middleware

    try {
        const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        logger.error("Error fetching payment history:", error);
        res.status(500).json({ message: 'Could not retrieve payment history' });
    }
};