// src/app/layout.js
"use client";
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider> {/* Wrap all content with AuthProvider */}
          <Header />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
