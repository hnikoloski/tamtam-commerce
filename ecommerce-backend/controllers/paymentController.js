const { createMollieClient } = require('@mollie/api-client'); // Importing createMollieClient
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY }); // Initialize with API key
const User = require('../models/User');
const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    const { amount, description, redirectUrl, webhookUrl } = req.body;
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
        console.error("Error creating payment:", error);
        res.status(500).json({ message: 'Payment creation failed' });
    }
};


exports.handleWebhook = async (req, res) => {
    const paymentId = req.body.id;

    try {
        const payment = await mollieClient.payments.get(paymentId);

        // Update payment status in the database
        await Payment.findOneAndUpdate({ paymentId }, { status: payment.status, updatedAt: Date.now() });

        if (payment.status === 'paid') {
            const userId = payment.metadata.userId;
            await User.findByIdAndUpdate(userId, { subscriptionStatus: 'active' });
        } else if (payment.status === 'failed') {
            const userId = payment.metadata.userId;
            await User.findByIdAndUpdate(userId, { subscriptionStatus: 'inactive' });
        }

        res.status(200).send('Webhook processed');
    } catch (error) {
        console.error("Error handling webhook:", error);
        res.status(500).send('Webhook processing failed');
    }
};

