import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend API base URL
    withCredentials: true, // Allow cookies and tokens to be sent
});

export default api;