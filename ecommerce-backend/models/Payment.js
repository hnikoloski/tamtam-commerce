const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'EUR' },
    status: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
