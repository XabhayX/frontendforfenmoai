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
        <div className="expense-form-container">
            <h2>Add New Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Amount (₹)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description (Optional)</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Saving...' : 'Add Expense'}
                </button>

                {status === 'error' && <p className="error-message">{error}</p>}
                {status === 'success' && <p className="success-message">Expense added successfully!</p>}
            </form>
        </div>
    );
};

export default ExpenseForm;
