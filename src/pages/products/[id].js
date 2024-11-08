import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useCart();

    // Placeholder product data - this would normally come from an API or file
    const product = {
        id,
        name: `Product ${id}`,
        price: 19.99,
        description: 'This is a great product that you’ll love.',
        image: 'https://via.placeholder.com/300'
    };

    return (
        <div>
            <Header />
            <main className="p-4">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
                <p className="mt-2">{product.description}</p>
                <p className="mt-2 font-semibold">Price: ${product.price}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 bg-blue-600 text-white p-2 rounded"
                >
                    Add to Cart
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetails;
