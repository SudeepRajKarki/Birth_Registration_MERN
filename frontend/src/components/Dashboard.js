import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/birth-registration/my-registrations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRegistrations(res.data);
      } catch (err) {
        console.error('Failed to fetch registrations:', err);
        setError('Failed to load your registrations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // Handle deletion of a registration
  const handleDeleteRegistration = async (registrationId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No authentication token found.');
      return;
    }

    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this registration?');
      
      if (confirmDelete) {
        // Make API call to delete the registration
        const res = await axios.delete(`http://localhost:5000/api/birth-registration/${registrationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If deletion is successful, update the UI
        setMessage(res.data.msg);
        setRegistrations(prevRegistrations =>
          prevRegistrations.filter(reg => reg._id !== registrationId)
        );
      }
    } catch (err) {
      setError('Failed to delete registration.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading your registrations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Birth Registrations</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {registrations.length === 0 ? (
        <p>You have not made any registrations yet.</p>
      ) : (
        <ul>
          {registrations.map((reg) => (
            <li key={reg._id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <strong>Child Name:</strong> {reg.childName} <br />
              <strong>Date of Birth:</strong> {new Date(reg.dateOfBirth).toLocaleDateString()} <br />
              <strong>Place of Birth:</strong> {reg.placeOfBirth} <br />
              <strong>Father's Name:</strong> {reg.fatherName} <br />
              <strong>Mother's Name:</strong> {reg.motherName} <br />
              <strong>Status:</strong> {
                reg.status === 'approved'
                  ? '✅ Approved'
                  : reg.status === 'declined'
                  ? '❌ Declined'
                  : '⏳ Pending'
              }
              <br />
              <button 
                onClick={() => handleDeleteRegistration(reg._id)}
                style={{ color: 'red', cursor: 'pointer', marginTop: '10px' }}
              >
                Delete Registration
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
