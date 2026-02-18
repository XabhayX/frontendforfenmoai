import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});

// Add a request interceptor to generate idempotency key if needed
// For now, we'll handle idempotency key generation in the component 
// or a specific wrapper function, as it's per-operation.

export default api;
