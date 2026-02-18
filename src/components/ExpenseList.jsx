import React, { useState, useEffect, useMemo } from 'react';
import api from '../utils/api';

const ExpenseList = ({ refreshTrigger }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('date_desc');

    const fetchExpenses = async () => {
        setLoading(true);
        setError(null);
        try {
            // We fetch all and filter/sort on client or server?
            // Requirement says: "User can filter expenses by category", "User can sort expenses by date"
            // And API supports query params. Let's use API for meaningful filtering/sorting.
            
            const params = {};
            if (filterCategory) params.category = filterCategory;
            if (sortOrder) params.sort = sortOrder;

            const response = await api.get('/expenses', { params });
            setExpenses(response.data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
            setError("Failed to load expenses.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [refreshTrigger, filterCategory, sortOrder]);

    // Calculate total of currently visible expenses
    const totalAmount = useMemo(() => {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }, [expenses]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };



    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <span className="text-emerald-500 text-2xl">≡</span> Expense List
            </h2>
            
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <label className="text-slate-600 text-sm font-semibold whitespace-nowrap">Category:</label>
                    <select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full md:w-auto px-3 py-1.5 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm text-slate-700"
                    >
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <label className="text-slate-600 text-sm font-semibold whitespace-nowrap">Sort:</label>
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full md:w-auto px-3 py-1.5 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm text-slate-700"
                    >
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Total Expenses</span>
                <span className="text-2xl font-bold text-emerald-600">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                {loading && <p className="text-center text-slate-500 py-8 animate-pulse">Loading expenses...</p>}
                {error && <p className="text-center text-rose-500 py-8 bg-rose-50 rounded-lg mx-4">{error}</p>}

                {!loading && !error && expenses.length === 0 && (
                    <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-slate-200 m-4">
                        <p className="text-slate-400 italic mb-2">No expenses found.</p>
                        <p className="text-slate-500 text-sm">Add a new expense to get started!</p>
                    </div>
                )}

                {!loading && !error && expenses.length > 0 && (
                    <ul className="space-y-3">
                        {expenses.map(expense => (
                            <li key={expense._id} className="p-4 flex justify-between items-center bg-white border border-slate-200 hover:border-indigo-300 rounded-lg transition-all hover:shadow-md group">
                                <div className="flex-1">
                                    <div className="flex items-center mb-1 gap-2">
                                        <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider border border-indigo-100">
                                            {expense.category}
                                        </span>
                                        <span className="text-slate-400 text-xs font-medium">{formatDate(expense.date)}</span>
                                    </div>
                                    <p className="text-slate-800 font-medium group-hover:text-indigo-900 transition-colors">{expense.description || expense.category}</p>
                                </div>
                                <div className="text-lg font-bold text-emerald-600 ml-4 font-mono bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                                    ₹{expense.amount.toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
