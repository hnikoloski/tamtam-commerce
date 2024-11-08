const Template = require('../models/Template');
const User = require('../models/User');


exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find({});
        console.log("Templates retrieved from DB:", templates); // Debugging log
        res.json(templates);
    } catch (error) {
        console.error("Error retrieving templates:", error);
        res.status(500).json({ message: error.message });
    }
};


// Function to select a template for a user
exports.selectTemplate = async (req, res) => {
    const userId = req.user.id; // Assume we have user ID from auth middleware
    const { templateId } = req.body;

    try {
        const template = await Template.findById(templateId);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { selectedTemplate: templateId },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
