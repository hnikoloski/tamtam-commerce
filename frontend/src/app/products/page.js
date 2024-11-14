"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";  // Import the AuthContext to get the token

const Products = () => {
    const { token } = useContext(AuthContext);  // Access the token from AuthContext
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!token) {
                console.error("No token found");  // Log if no token is available
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,  // Send token in the Authorization header
                        },
                    }
                );
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProducts();  // Only fetch products if token exists
        }
    }, [token]);  // Add token as a dependency to re-run the effect if the token changes

    if (loading) return <div className="flex justify-center items-center min-h-screen text-foreground">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-12 bg-background text-foreground">
            <h1 className="text-4xl font-bold text-center mb-8">Explore Our Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product._id} className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-card-dark transition-all duration-300 ease-in-out">
                        <div className="bg-card p-6 rounded-t-xl">
                            <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
                            <p className="text-gray-300 mt-2">{product.description}</p>
                            <p className="text-xl font-semibold text-primary mt-4">€{product.price}</p>
                        </div>
                        <div className="bg-card p-4 rounded-b-xl flex justify-between items-center">
                            <Link
                                href={`/products/${product._id}`}
                                className="text-primary hover:text-primary-400 font-semibold"
                            >
                                View Details
                            </Link>
                            <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
