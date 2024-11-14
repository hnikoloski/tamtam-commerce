"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const Dashboard = () => {
    const { token, logout } = useContext(AuthContext);  // Access context
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (token) {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/dashboard`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setDashboardData(response.data);
                    setError(null); // Clear any previous error
                }
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                if (err.response && err.response.data.message === "Token is not valid") {
                    logout(); // If token is invalid, log the user out
                } else {
                    setError("Failed to load dashboard data");
                }
            }
        };

        if (token) {
            fetchDashboardData();
        }
    }, [token, logout]);  // Ensure that the effect is rerun when token changes

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!dashboardData) {
        return <p>Loading...</p>;
    }

    const { subscriptionExpiry, userProfile, paymentHistory, totalPayments } = dashboardData;

    return (
        <div className="flex justify-center bg-background">
            <div className="w-full max-w-2xl bg-gray-900 text-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-primary">Dashboard</h1>

                <div className="mb-6 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">User Profile</h2>
                        <p><strong>Name:</strong> {userProfile.name}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Subscription Status</h2>
                        <p><strong>Expires On:</strong> {subscriptionExpiry}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Total Payments</h2>
                        <p>{totalPayments} EUR</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Payment History</h2>
                        <ul className="space-y-4">
                            {paymentHistory.map((payment) => (
                                <li
                                    key={payment._id}
                                    className="p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md"
                                >
                                    <p>
                                        <strong>Description:</strong> {payment.description}
                                    </p>
                                    <p>
                                        <strong>Amount:</strong> {payment.amount} {payment.currency}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`font-semibold ${payment.status === "paid"
                                                ? "text-green-500"
                                                : "text-red-500"
                                                }`}
                                        >
                                            {payment.status === "paid" ? "Active" : "Pending"}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
