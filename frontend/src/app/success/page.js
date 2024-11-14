"use client";

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const SuccessPage = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear the cart upon successful payment
        clearCart();
    }, []);

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-3xl mb-4">Payment Successful!</h1>
            <p>Thank you for your purchase. Your order is being processed.</p>
        </div>
    );
};

export default SuccessPage;
