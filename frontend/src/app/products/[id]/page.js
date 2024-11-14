"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext"; // Import AuthContext

const ProductDetails = ({ params }) => {
    const { token } = useContext(AuthContext);  // Access the token from AuthContext
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!token) {
                console.error("No token found");  // Log if no token is available
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,  // Send token in the Authorization header
                        },
                    }
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id && token) {  // Ensure that params.id exists before calling fetchProduct
            fetchProduct();  // Only fetch product if token exists and params.id is available
        }
    }, [params.id, token]);  // Add token as a dependency to re-run the effect if the token changes

    const handlePurchase = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/create-payment`,
                {
                    amount: product.price,
                    description: `Purchase of ${product.name}`,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },  // Send token for the payment request
                }
            );
            window.location.href = response.data.checkoutUrl; // Redirect to payment
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };

    if (loading) return <p>Loading product details...</p>;

    return (
        <div className="container mx-auto p-4">
            {product && (
                <div className="border rounded-lg p-6 shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-blue-600 font-semibold text-xl">€{product.price}</p>
                    <button
                        onClick={handlePurchase}
                        className="bg-green-500 text-white px-4 py-2 mt-6 rounded hover:bg-green-600 transition"
                    >
                        Buy Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
