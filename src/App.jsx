import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

function ExpenseTracker() {
  const [refreshList, setRefreshList] = useState(0);
  const { user, logout } = useAuth();

  const handleExpenseAdded = () => {
    setRefreshList(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <div className="user-controls">
            <span>Welcome, {user?.fullName}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      <main className="app-content">
        <section className="form-section">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        </section>
        <section className="list-section">
          <ExpenseList refreshTrigger={refreshList} />
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <ExpenseTracker />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
