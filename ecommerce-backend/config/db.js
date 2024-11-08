const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB at:", process.env.MONGO_URI); // Debugging log
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to ${process.env.MONGO_URI}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
