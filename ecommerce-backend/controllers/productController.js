// controllers/productController.js
const Product = require('../models/Product');

// Add a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, stock } = req.body;
        const userId = req.user.id; // Assuming auth middleware sets user on req

        const product = new Product({ userId, name, description, price, imageUrl, stock });
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error creating product" });
    }
};

// Get all products for a user
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Error retrieving products" });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product" });
    }
};
