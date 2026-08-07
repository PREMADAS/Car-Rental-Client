"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check logged in user when app loads
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await fetch(`${API_URL}/me`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.log(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getCurrentUser();
    }, []);

    // Login
    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setUser(data.user);

            return data;
        } finally {
            setLoading(false);
        }
    };

    // Register
    const register = async (userData) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return data;
        } finally {
            setLoading(false);
        }
    };
    // Google Login
    const googleLogin = async (credential) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/google-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ credential }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setUser(data.user);

            return data;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setUser(null);

            return data;
        } finally {
            setLoading(false);
        }
    };

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        login,
        register,
        logout,
        googleLogin,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}