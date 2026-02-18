import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user/token on mount
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('accessToken');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            // Set default header
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, username, password) => {
        try {
            const response = await api.post('/users/login', { email, username, password });
            const { user, accessToken, refreshToken } = response.data.data;

            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);
            
            // Set default header
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Login failed" 
            };
        }
    };

    const register = async (userData) => {
        try {
             await api.post('/users/register', userData);
             return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Registration failed" 
            };
        }
    }

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            delete api.defaults.headers.common['Authorization'];
        }
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
