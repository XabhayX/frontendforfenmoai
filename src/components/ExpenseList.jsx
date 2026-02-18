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
        <div className="expense-list-container">
            <h2>Expense List</h2>
            
            <div className="controls">
                <div className="filter-group">
                    <label>Filter by Category:</label>
                    <select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="sort-group">
                    <label>Sort by Date:</label>
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="total-display">
                <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
            </div>

            {loading && <p>Loading expenses...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && expenses.length === 0 && (
                <p>No expenses found.</p>
            )}

            {!loading && !error && expenses.length > 0 && (
                <ul className="expense-list">
                    {expenses.map(expense => (
                        <li key={expense._id} className="expense-item">
                            <div className="expense-details">
                                <span className="category-tag">{expense.category}</span>
                                <span className="description">{expense.description || expense.category}</span>
                                <span className="date">{formatDate(expense.date)}</span>
                            </div>
                            <div className="expense-amount">
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
