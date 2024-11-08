import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    useEffect(() => {
        console.log("Cart Items on Cart Page:", cartItems); // Check if cartItems shows the added items
    }, [cartItems]);

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <Header />
            <main className="p-4">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="border-b py-2">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="bg-red-500 text-white p-1 rounded mt-1"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p className="font-semibold mt-4">Total: ${totalAmount.toFixed(2)}</p>
                        <button onClick={clearCart} className="mt-4 bg-red-600 text-white p-2 rounded">
                            Clear Cart
                        </button>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Cart;
