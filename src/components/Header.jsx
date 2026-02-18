import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-indigo-100">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors tracking-tight">
                    Expense Tracker
                </Link>
                
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <span className="text-slate-700 font-medium text-sm">{user.fullName}</span>
                                <span className="text-slate-400 text-xs">@{user.username}</span>
                            </div>
                            <button 
                                onClick={logout} 
                                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-2">
                             <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium px-4 py-2 transition-colors">Login</Link>
                             <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 font-medium">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
