const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
    siteName: { type: String, required: true },
    customDomain: { type: String }, // optional custom domain if the user adds one
    subdomain: { type: String, unique: true }, // subdomain like "username.yourplatform.com"
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    settings: {
        themeColor: { type: String, default: '#ffffff' },
        logoURL: { type: String },
        // add more customization fields as needed
    },
});

module.exports = mongoose.model('Site', siteSchema);
