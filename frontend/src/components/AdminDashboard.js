import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchRegistrations = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('http://localhost:5000/api/admin/registrations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRegistrations(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Axios error:', err?.response || err.message);
      setError('Failed to load registrations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/${action}/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setRegistrations((prev) =>
        prev.map((reg) =>
          reg._id === id ? { ...reg, status: action === 'approve' ? 'approved' : 'declined' } : reg
        )
      );
    } catch (err) {
      console.error(`Failed to ${action}:`, err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    let filteredList = registrations;

    if (statusFilter !== 'all') {
      filteredList = filteredList.filter((reg) => reg.status === statusFilter);
    }

    if (searchTerm) {
      filteredList = filteredList.filter((reg) =>
        [reg.childName, reg.fatherName, reg.motherName, reg.placeOfBirth]
          .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFiltered(filteredList);
  }, [searchTerm, statusFilter, registrations]);

  if (loading) return <p className="text-center mt-5">Loading registrations...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">All Birth Registrations</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by child or parents' names, place of birth..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </Form.Select>
        </Col>
      </Row>

      {filtered.length === 0 ? (
        <p className="text-muted text-center">No registrations match your criteria.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filtered.map((reg) => (
            <Col key={reg._id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{reg.childName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    DOB: {new Date(reg.dateOfBirth).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Place:</strong> {reg.placeOfBirth}<br />
                    <strong>Father:</strong> {reg.fatherName}<br />
                    <strong>Mother:</strong> {reg.motherName}<br />
                    <strong>Status:</strong>{' '}
                    {reg.status === 'approved' ? '✅ Approved' :
                      reg.status === 'declined' ? '❌ Declined' :
                      '⏳ Pending'}
                  </Card.Text>

                  {reg.status === 'pending' && (
                    <div className="d-flex gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => updateStatus(reg._id, 'approve')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => updateStatus(reg._id, 'decline')}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AdminDashboard;
