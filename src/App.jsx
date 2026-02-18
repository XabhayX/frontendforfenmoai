import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';


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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-1">
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            </section>
            <section className="lg:col-span-2">
              <ExpenseList refreshTrigger={refreshList} />
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/login" element={
      <>
      <Header />
      <Login />
      </>
                  } />
                  <Route path="/signup" element={
                    <>
      <Header />
                    <Signup />
                    <Footer />
                    </>
                    } />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>

                            <ExpenseTracker />
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
