// src/components/Header.jsx
"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const { token, logout, loading } = useContext(AuthContext); // Correctly destructure the context
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>; // Prevent rendering if context is still loading
  }

  const handleLogout = () => {
    logout(); // Log the user out and redirect to login page
    router.push("/login");
  };

  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <h1 className="text-xl font-bold">TamTam E-commerce</h1>
        </Link>
        <nav>
          {token ? ( // If token exists, show dashboard and logout
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // Otherwise, show login link
            <Link
              href="/login"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
