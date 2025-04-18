import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BirthForm = () => {
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    fatherName: '',
    motherName: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/birth-registration', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('✅ Birth registration submitted successfully!');
      setFormData({
        childName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        fatherName: '',
        motherName: '',
      });
    } catch (err) {
      console.error(err);
      if (err.response) {
        setMessage(`❌ Server Error: ${err.response.data.msg || 'Something went wrong.'}`);
      } else if (err.request) {
        setMessage('❌ No response received from the server.');
      } else {
        setMessage(`❌ Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4 text-primary">Birth Registration Form</h2>
            {message && (
              <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Child's Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Place of Birth</label>
                <input
                  type="text"
                  className="form-control"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Father's Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mother's Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthForm;
