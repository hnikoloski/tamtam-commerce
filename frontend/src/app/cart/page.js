import React from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';

const CartPage = () => {
    const { cart, updateCartItem, removeFromCart } = useCart();

    const handleQuantityChange = (productId, quantity) => {
        updateCartItem(productId, quantity);
    };

    const handleRemove = productId => {
        removeFromCart(productId);
    };

    const totalPrice = cart.items.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
    }, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Shopping Cart</h1>
            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.items.map(item => (
                        <div key={item.productId._id} className="flex items-center mb-4">
                            <img
                                src={item.productId.imageUrl}
                                alt={item.productId.name}
                                className="w-16 h-16 object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg">{item.productId.name}</h2>
                                <p>€{item.productId.price.toFixed(2)}</p>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={e => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                                    className="border p-1 w-16"
                                />
                            </div>
                            <button
                                onClick={() => handleRemove(item.productId._id)}
                                className="text-red-500 hover:underline ml-4"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-right">
                        <p className="text-xl">
                            Total: <strong>€{totalPrice.toFixed(2)}</strong>
                        </p>
                        <Link href="/checkout">
                            <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 inline-block">
                                Proceed to Checkout
                            </a>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
