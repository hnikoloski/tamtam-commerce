// src/app/dashboard/page.js
"use client";
import React, { useState } from 'react';
import ProductList from '@/components/products/ProductList';
import ProductForm from '@/components/products/ProductForm';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [newProduct, ...prevProducts]);
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <ProductForm onProductAdded={handleProductAdded} />
            <ProductList products={products} />
        </div>
    );
};

export default Dashboard;
