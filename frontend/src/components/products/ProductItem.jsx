// src/components/products/ProductItem.jsx
"use client";
import React from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const ProductItem = ({ product, onEdit, onDelete }) => {
  const { token } = useContext(AuthContext); // Get token from context

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(product._id); // Remove deleted product from list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow-lg">
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-gray-700">Price: €{product.price}</p>
      <p>Stock: {product.stock}</p>
      <button
        onClick={onEdit}
        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductItem;
