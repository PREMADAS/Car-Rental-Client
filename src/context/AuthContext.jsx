"use client";

import { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Current user fetch logic wrapped in useCallback for reusability
    const getCurrentUser = useCallback(async () => {
        try {
            const res = await fetch(`/api/me`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                setUser(null);
                return null;
            }

            const data = await res.json();
            setUser(data);
            return data;
        } catch (error) {
            console.error("Auth check error:", error);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // Fetch user profile immediately to sync session cookie & user state
            await getCurrentUser();
            return data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return data;
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async (credential) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ credential }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // Fetch user profile immediately to sync session cookie & user state
            await getCurrentUser();
            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/logout`, {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setUser(null);
            return data;
        } catch (error) {
            console.error("Logout error:", error);
            setUser(null);
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
        refetchUser: getCurrentUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}