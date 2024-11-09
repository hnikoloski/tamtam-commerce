const User = require('../models/User');
const Payment = require('../models/Payment');

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('subscriptionStatus name email subscriptionExpiry');
        const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
        const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

        res.status(200).json({
            subscriptionStatus: user.subscriptionStatus,
            subscriptionExpiry: user.subscriptionExpiry || 'N/A',
            userProfile: {
                name: user.name,
                email: user.email,
            },
            paymentHistory: payments,
            totalPayments,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", { message: error.message, stack: error.stack });
        res.status(500).json({ message: 'Could not retrieve dashboard data' });
    }
};
