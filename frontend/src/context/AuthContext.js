"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken); // Store the token in local storage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remove token from local storage
        router.push('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
