import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/client";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const token = await AsyncStorage.getItem("@splitbuddy_token");
            const storedUser = await AsyncStorage.getItem("@splitbuddy_user");

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                // Optionally verify token validity with backend here
                // await client.get('/auth/me');
            }
        } catch (error) {
            console.error("Failed to load user", error);
            await logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await client.post("/auth/login", { email, password });

            const userSession = {
                id: data._id,
                name: data.name,
                email: data.email,
            };

            await AsyncStorage.setItem("@splitbuddy_token", data.token);
            await AsyncStorage.setItem("@splitbuddy_user", JSON.stringify(userSession));
            setUser(userSession);

            return { success: true };
        } catch (error) {
            console.log("Login error:", error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await client.post("/auth/register", {
                name,
                email,
                password,
            });

            const userSession = {
                id: data._id,
                name: data.name,
                email: data.email,
            };

            await AsyncStorage.setItem("@splitbuddy_token", data.token);
            await AsyncStorage.setItem("@splitbuddy_user", JSON.stringify(userSession));
            setUser(userSession);

            return { success: true };
        } catch (error) {
            console.log("Register error:", error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed",
            };
        }
    };

    const loginAsGuest = async () => {
        try {
            const guestUser = {
                id: "guest",
                name: "Guest",
                email: "guest@local",
            };
            await AsyncStorage.setItem("@splitbuddy_user", JSON.stringify(guestUser));
            setUser(guestUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("@splitbuddy_token");
            await AsyncStorage.removeItem("@splitbuddy_user");
            setUser(null);
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        loginAsGuest,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
