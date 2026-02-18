import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { v4 as uuidv4 } from 'uuid';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [idempotencyKey, setIdempotencyKey] = useState('');
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [error, setError] = useState(null);

    useEffect(() => {
        // Generate a new key when the component mounts or after a successful submission
        setIdempotencyKey(uuidv4());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError(null);

        try {
            const response = await api.post('/expenses', {
                ...formData,
                idempotencyKey
            });

            console.log('Expense created:', response.data);
            setStatus('success');
            onExpenseAdded(); // Refresh list

            // Reset form and generate new key for next entry
            setFormData({
                amount: '',
                category: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
            });
            setIdempotencyKey(uuidv4());
            
            // Clear success message after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);

        } catch (err) {
            console.error('Error creating expense:', err);
            setStatus('error');
            setError(err.response?.data?.message || 'Failed to create expense. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Add New Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Amount (₹)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description (Optional)</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Saving...' : 'Add Expense'}
                </button>

                {status === 'error' && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
                {status === 'success' && <p className="mt-4 text-green-600 text-sm text-center font-medium">Expense added successfully!</p>}
            </form>
        </div>
    );
};

export default ExpenseForm;
