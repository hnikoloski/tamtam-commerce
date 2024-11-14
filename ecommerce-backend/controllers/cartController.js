const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get the user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        res.status(200).json(cart || { items: [] });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            // Create a new cart for the user
            cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
        } else {
            // Check if product already in cart
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if (itemIndex > -1) {
                // Update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item
                cart.items.push({ productId, quantity });
            }
        }

        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        if (quantity <= 0) {
            // Remove item if quantity is zero or less
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item' });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Error removing from cart' });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ userId: req.user.id });
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Error clearing cart' });
    }
};
