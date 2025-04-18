import React, { useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom'; // Remove navigate import

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        try {
            const res = await api.post('/auth/login', formData);
            const role = res.data.role || 'user';
    
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', role);
    
            // Redirect based on user role
            if (role === 'admin') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/dashboard';
            }
        } catch (err) {
            console.error('Error during login:', err.response ? err.response.data : err.message);
            alert('Login failed. Please check your credentials.');
        }
    };
    

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-sm" style={{ width: '400px' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email Field */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        {/* Password Field */}
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="mb-3 text-end">
                            <Link to="/forgot-password" className="text-decoration-none small">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>

                        {/* Link to Register Page */}
                        <p className="text-center mt-3 mb-0">
                            Don't have an account?{' '}
                            <a href="/register" className="text-decoration-none">
                                Register here
                            </a>
                            .
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
