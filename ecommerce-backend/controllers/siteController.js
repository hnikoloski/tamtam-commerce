const Site = require('../models/Site');
const User = require('../models/User');

// Create a site for the user
exports.createSite = async (req, res) => {
    const { siteName, customDomain, settings } = req.body;
    const userId = req.user.id; // Assuming user ID is set by auth middleware

    try {
        // Check if the user has selected a template
        const user = await User.findById(userId).populate('selectedTemplate');
        if (!user.selectedTemplate) {
            return res.status(400).json({ message: 'No template selected' });
        }

        // Create a unique subdomain based on username or some identifier
        const subdomain = `${user.name.toLowerCase().replace(/\s/g, '')}.yourplatform.com`;

        // Create the site
        const site = new Site({
            user: userId,
            template: user.selectedTemplate._id,
            siteName,
            customDomain,
            subdomain,
            settings,
        });

        await site.save();
        res.status(201).json({ message: 'Site created successfully', site });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
