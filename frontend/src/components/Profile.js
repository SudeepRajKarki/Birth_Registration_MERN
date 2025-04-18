import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  // Change `username` to `name` in the state
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found.');
          setFetching(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log the response data to debug
        console.log('Fetched user details:', res.data);

        setUser({ name: res.data.name, email: res.data.email }); // Set name instead of username
        setFetching(false);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch user details.');
        setFetching(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      setLoading(true);
      const res = await axios.delete('http://localhost:5000/api/user/delete-account', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(res.data.msg);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.msg || 'Failed to delete account.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Your Profile</h2>

        {fetching ? (
          <p>Loading user details...</p>
        ) : (
          <>
            <div className="mb-3">
              <strong>Username:</strong> {user.name}  {/* Access name */}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {user.email}
            </div>
          </>
        )}

        <hr />

        <div>
          <h5>Delete Account</h5>
          <button
            className="btn btn-danger"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>

        {message && (
          <div className="alert alert-success mt-3" role="alert">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
