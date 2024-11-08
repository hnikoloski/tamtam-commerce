// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Ensure addToCart is accessed here

  return (
    <div className="border p-4 rounded shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-gray-700">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-600 text-white p-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
