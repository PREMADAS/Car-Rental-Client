"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check logged in user when app loads
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/me", {
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
        const res = await fetch("http://localhost:5000/login", {
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
    };

    // Register
    const register = async (userData) => {
        const res = await fetch("http://localhost:5000/register", {
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
    };

    // Logout
    const logout = async () => {
        const res = await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        setUser(null);

        return data;
    };

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}