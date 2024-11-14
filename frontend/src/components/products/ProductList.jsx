// src/components/products/ProductList.jsx
"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext"; // Access token from context

const ProductList = () => {
  const { token } = useContext(AuthContext); // Get token from context
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        return; // If no token, exit early
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the headers
            },
          }
        );

        setProducts(response.data); // Store products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="flex flex-col space-y-4">
      {products.map((product) => (
        <div key={product._id} className="p-4 border rounded shadow-lg">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="text-gray-700">Price: €{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
