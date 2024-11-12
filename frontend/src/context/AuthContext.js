"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");

            if (savedToken) {
                const tokenParts = savedToken.split(".");
                if (tokenParts.length === 3) {
                    // Decode the JWT to check the expiration date
                    const decodeBase64Url = (base64Url) => {
                        // Handle base64url to base64 conversion
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        return atob(base64);
                    };

                    try {
                        const decodedToken = JSON.parse(decodeBase64Url(tokenParts[1]));
                        const isExpired = decodedToken.exp * 1000 < Date.now(); // JWT expiration is in seconds, so multiply by 1000 to convert to ms

                        if (!isExpired) {
                            setToken(savedToken); // Token is valid
                        } else {
                            localStorage.removeItem("token"); // Remove expired token
                        }
                    } catch (error) {
                        console.error("Failed to decode token:", error);
                        localStorage.removeItem("token"); // If decoding fails, remove token
                    }
                } else {
                    console.error("Invalid token format");
                    localStorage.removeItem("token"); // Invalid token format, remove it
                }
            }

            setLoading(false); // Set loading to false after checking token
        }
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
