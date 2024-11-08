const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    previewURL: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
});

module.exports = mongoose.model('Template', templateSchema);
