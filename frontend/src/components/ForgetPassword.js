import React, { useState } from 'react';
import api from '../api/axios';  // Assume you have a preconfigured axios instance

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      // POST request to backend API (handled by axios instance)
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.msg);  // Assuming backend returns a success message
      setError('');  // Clear any previous errors if success
      setLoading(false);
      setEmail('');  // Optional: Clear the input field after successful submission
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data.msg || 'Failed to send reset link.' : 'Failed to send reset link.');
    }
  };

  // Clear error when user starts typing in the email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error message when the user starts typing again
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Forgot Password</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}  // Use the modified onChange handler
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
