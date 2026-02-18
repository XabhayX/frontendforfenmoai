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


        <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-slate-100">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Create Account</h2>
            {error && <div className="mb-6 p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-sm text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Full Name</label>
                    <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
                        placeholder="johndoe123"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
                        placeholder="••••••••"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-600">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
