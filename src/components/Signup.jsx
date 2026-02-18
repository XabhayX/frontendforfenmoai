import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
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
        
        const result = await register(formData);
        
        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message);
        }
    };

    return (

        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
            {error && <p className="mb-4 text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
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
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
