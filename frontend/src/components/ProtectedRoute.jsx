// src/components/ProtectedRoute.js
"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return token ? children : null;
};

export default ProtectedRoute;
