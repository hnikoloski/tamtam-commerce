import Link from "next/link";

const NavBar = () => (
  <nav className="p-4 bg-gray-800 text-white flex justify-between">
    <Link href="/">Home</Link>
    <Link href="/shop">Shop</Link>
    <Link href="/cart">Cart</Link>
  </nav>
);

export default NavBar;
