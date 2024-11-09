"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
                );
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="text-blue-600 font-semibold">€{product.price}</p>
                        <Link
                            href={`/products/${product._id}`}
                            className="text-blue-500 hover:underline mt-4 inline-block"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
