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

        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Expense List</h2>
            
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-gray-700 text-sm font-bold whitespace-nowrap">Category:</label>
                    <select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-gray-700 text-sm font-bold whitespace-nowrap">Sort:</label>
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="text-right font-bold text-xl mb-6 text-green-600 border-b pb-4">
                <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
            </div>

            {loading && <p className="text-center text-gray-500 py-4">Loading expenses...</p>}
            {error && <p className="text-center text-red-500 py-4">{error}</p>}

            {!loading && !error && expenses.length === 0 && (
                <p className="text-center text-gray-500 py-8 italic">No expenses found.</p>
            )}

            {!loading && !error && expenses.length > 0 && (
                <ul className="divide-y divide-gray-200">
                    {expenses.map(expense => (
                        <li key={expense._id} className="py-4 flex justify-between items-center hover:bg-gray-50 transition-colors rounded-md px-2">
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mr-2 uppercase tracking-wide">
                                        {expense.category}
                                    </span>
                                    <span className="text-gray-400 text-xs">{formatDate(expense.date)}</span>
                                </div>
                                <p className="text-gray-800 font-medium">{expense.description || expense.category}</p>
                            </div>
                            <div className="text-lg font-bold text-gray-900 ml-4">
                                ₹{expense.amount.toFixed(2)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
