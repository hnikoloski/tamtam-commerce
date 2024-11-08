import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.length;

  return (
    <Link href="/cart" className="relative">
      🛒
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
