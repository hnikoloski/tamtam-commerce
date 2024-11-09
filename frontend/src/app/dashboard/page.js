// src/app/dashboard/page.js
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Dashboard = () => {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                router.push('/login');
            }
        };

        fetchData();
    }, [router]);

    if (!data) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dashboard</h1>

            {/* Subscription Status */}
            <div className="mb-6">
                <p className="text-lg font-medium text-gray-700">Subscription Status:</p>
                <p className={`text-xl font-semibold ${data.subscriptionStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {data.subscriptionStatus || 'N/A'}
                </p>
            </div>

            {/* Payment History */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment History</h2>
                <ul className="space-y-4">
                    {data.paymentHistory.length > 0 ? (
                        data.paymentHistory.map((payment) => (
                            <li key={payment._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <p className="text-gray-700">
                                    <span className="font-medium">Description:</span> {payment.description}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Amount:</span> {payment.amount} EUR
                                </p>
                                <p className={`font-semibold ${payment.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                    Status: {payment.status}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No payment history available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
