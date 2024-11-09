// src/components/products/ProductItem.js
import React from "react";

const ProductItem = ({ product, onEdit, onDelete }) => {
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
        onClick={onDelete}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductItem;
