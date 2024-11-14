import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });

    useEffect(() => {
        // Fetch cart from backend
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await axios.post(
                '/api/cart/add',
                { productId, quantity },
                { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
            );
            setCart(response.data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            const response = await axios.put(
                '/api/cart/update',
                { productId, quantity },
                { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
            );
            setCart(response.data);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const removeFromCart = async productId => {
        try {
            const response = await axios.post(
                '/api/cart/remove',
                { productId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
            );
            setCart(response.data);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.post('/api/cart/clear', null, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setCart({ items: [] });
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
