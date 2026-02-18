import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Allow login with either username or email
        const { email, username, password } = formData;
        
        const result = await login(email, username, password);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            {error && <p className="mb-4 text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username (optional if using email)</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email (optional if using username)</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
