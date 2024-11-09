"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const ProductForm = ({ onProductAdded }) => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        {
          name,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onProductAdded(response.data); // Pass new product to parent
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;