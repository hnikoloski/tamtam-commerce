require('dotenv').config(); // Load environment variables at the top
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const templateRoutes = require('./routes/templateRoutes');
const siteRoutes = require('./routes/siteRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Initialize the Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/payments', paymentRoutes); // Add payment routes
app.get('/success', (req, res) => {
    res.send("<h1>Payment Successful</h1><p>Thank you for your payment!</p>");
});

// User routes
app.use('/api/user', userRoutes);

// Product routes
app.use('/api/products', productRoutes);
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
