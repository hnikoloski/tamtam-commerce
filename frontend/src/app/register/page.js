"use client";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Optional: Icons for show/hide password

const Register = () => {
    const router = useRouter();
    const { loading } = useContext(AuthContext); // Access loading state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

    if (loading) return <p>Loading...</p>; // Prevent registration attempt until loading is complete

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
                email,
                password,
            });
            router.push("/login"); // Redirect to login page after successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Register error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-8 text-primary">Register</h1>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-foreground text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-input text-black"
                            autoComplete="email"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-foreground text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}  // Toggle between password and text type
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-input text-black"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}  // Toggle password visibility
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Show/hide icon */}
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-foreground text-sm font-medium mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}  // Toggle between password and text type
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-input text-black"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}  // Toggle confirm password visibility
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}  {/* Show/hide icon */}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
