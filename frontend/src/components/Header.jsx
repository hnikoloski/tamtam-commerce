"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // Optional icon import

const Header = () => {
  const { token, logout, loading } = useContext(AuthContext);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled beyond a certain point (50px for example)
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-4 px-8 transition-all duration-300 bg-primary-900 ${
        isScrolled
          ? "bg-opacity-80 backdrop-blur-lg shadow-lg"
          : "bg-opacity-100 backdrop-blur-none"
      }`}
      id="masthead"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-white">
          TamTam E-commerce
        </Link>

        <nav className="flex items-center space-x-8">
          {token ? (
            <>
              <Link
                href="/dashboard"
                className="text-lg text-primary hover:text-primary-500 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-primary-600 text-foreground px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-foreground px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-300"
            >
              Login
            </Link>
          )}

          {/* Optional User Icon */}
          {token && (
            <FaUserCircle className="text-primary text-2xl cursor-pointer hover:text-primary-500 transition duration-300" />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
