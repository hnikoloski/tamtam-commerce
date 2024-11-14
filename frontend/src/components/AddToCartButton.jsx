import React from "react";
import { useCart } from "../contexts/CartContext";

const AddToCartButton = ({ productId }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(productId, 1);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
