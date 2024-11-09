// routes/productRoutes.js
const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProduct); // Add a product
router.get('/', authMiddleware, getProducts); // Get all products
router.put('/:id', authMiddleware, updateProduct); // Update a product
router.delete('/:id', authMiddleware, deleteProduct); // Delete a product

module.exports = router;
