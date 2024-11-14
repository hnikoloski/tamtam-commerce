// src/components/products/ProductDetails.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${params.id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/create-payment`,
        {
          amount: product.price,
          description: `Purchase of ${product.name}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = response.data.checkoutUrl; // Redirect to payment provider
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
          <p className="text-blue-600 font-semibold text-xl">
            €{product.price}
          </p>
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
