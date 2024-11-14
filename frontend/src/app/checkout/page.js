import React from 'react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const router = useRouter();

    const handleCheckout = async () => {
        try {
            const response = await axios.post(
                '/api/payments/create-payment',
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );

            // Redirect to Mollie checkout URL
            window.location.href = response.data.checkoutUrl;
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Checkout</h1>
            <p>Please review your order and proceed to payment.</p>
            {/* You can display order summary here */}
            <button
                onClick={handleCheckout}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default CheckoutPage;
