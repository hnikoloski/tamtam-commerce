// src/app/layout.js
"use client";

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import './globals.css';
import Loader from '@/components/Loader';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(60);

  useEffect(() => {
    // Simulate loading for demonstration purposes
    setTimeout(() => setLoading(false), 1500); // Adjust time as needed
  }, []);

  useEffect(() => {
    const header = document.getElementById('masthead');
    if (header) {
      setHeaderHeight(header.clientHeight);
    }

  }, []);


  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <CartProvider>
            <Header />
            {loading ? (
              <Loader /> // Show loader while loading
            ) : (
              <main className="mx-auto"
                style={{ paddingTop: `${headerHeight}px` }}
              >{children}</main>
            )}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
