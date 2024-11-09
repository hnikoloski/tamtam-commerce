// src/app/layout.js
"use client";
import React from 'react';
import Header from '@/components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
