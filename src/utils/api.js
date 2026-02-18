import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
});

// Add a request interceptor to generate idempotency key if needed
// For now, we'll handle idempotency key generation in the component 
// or a specific wrapper function, as it's per-operation.

// Add a response interceptor to handle global errors like 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Unatuhorized, clear storage and redirect (simple approach)
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
               window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
