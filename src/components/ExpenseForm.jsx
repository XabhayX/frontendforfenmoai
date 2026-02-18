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
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <span className="text-indigo-600 text-2xl">+</span> Add New Expense
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Amount (₹)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400 text-slate-800"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white text-slate-800"
                    >
                        <option value="" className="text-slate-400">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Description (Optional)</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 resize-none"
                        placeholder="What was this expense for?"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
                >
                    {status === 'submitting' ? 'Saving...' : 'Add Expense'}
                </button>

                {status === 'error' && <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-sm text-center">{error}</div>}
                {status === 'success' && <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-sm text-center font-medium">Expense added successfully!</div>}
            </form>
        </div>
    );
};

export default ExpenseForm;
