import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch initial cart data from backend
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };
        fetchCart();
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await axios.post('/api/cart', { productId: product.id, quantity: 1 });
            setCartItems(response.data); // Update cart items with the server response
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete(`/api/cart/${productId}`);
            setCartItems(response.data); // Update cart items with the server response
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete('/api/cart');
            setCartItems([]);
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
