import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceRequestForm from './ServiceRequestForm';

const UserService = () => {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      const userId = authUser?._id;

      if (!userId) {
        setError('Please login to view your services');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:5000/services/get-user-service/${userId}`);
      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else if (response.data.success && response.data.data) {
        setServices(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch services');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await axios.delete(`http://localhost:5000/services/${id}`);
        fetchServices();
      } catch (err) {
        alert('Delete failed!');
      }
    }
  };

  const getStatusColor = (status) => {
    const base = {
      padding: '6px 14px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '13px',
      textTransform: 'capitalize'
    };
    switch (status.toLowerCase()) {
      case 'pending':
        return { ...base, backgroundColor: '#fff3cd', color: '#856404' };
      case 'done':
        return { ...base, backgroundColor: '#bbdefb', color: '#0d47a1' };
      case 'rejected':
        return { ...base, backgroundColor: '#ffcdd2', color: '#b71c1c' };
      default:
        return { ...base, backgroundColor: '#eceff1', color: '#333' };
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const btnStyle = {
    backgroundColor: '#1565c0', // Blue
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    }}>
      <style>{`
        @keyframes fadeIn {
          0% { transform: translateY(15px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          transition: all 0.3s ease;
        }
      `}</style>

      {!showForm ? (
        <>
          <div style={headerStyle}>
            <h2 style={{ color: '#0d47a1', fontSize: '28px', fontWeight: '700' }}>My Service Requests</h2>
            <button style={btnStyle} onClick={() => setShowForm(true)}>+ New Request</button>
          </div>

          {loading ? (
            <p style={{ color: '#000', fontSize: '18px', textAlign: 'center' }}>Loading your services...</p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : services.length === 0 ? (
            <p style={{ color: '#555', fontSize: '17px', textAlign: 'center' }}>You haven't submitted any service requests yet.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              }}
            >
              {services.map((service) => (
                <div
                  key={service._id}
                  className="hover-card"
                  style={{
                    animation: 'fadeIn 0.6s ease',
                    backgroundColor: '#fdfdfd',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '1.8rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '20px', color: '#000', fontWeight: '600' }}>
                      {service.productName}
                    </h3>
                    <span style={getStatusColor(service.status)}>{service.status}</span>
                  </div>
                  <div style={{ fontSize: '15px', color: '#555' }}>
                    <p><strong>Product ID:</strong> {service.productID}</p>
                    <p><strong>Purchase Date:</strong> {new Date(service.productPurchasedDate).toLocaleDateString()}</p>
                    <p><strong>Warranty:</strong> {service.productWarrantyPeriod} months</p>
                    <p><strong>Description:</strong> {service.claimDescription}</p>
                  </div>
                  <button
                    style={{
                      ...btnStyle,
                      backgroundColor: '#c62828',
                      marginTop: '1rem',
                      width: '100%',
                    }}
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={headerStyle}>
            <h2 style={{ color: '#0d47a1', fontSize: '28px', fontWeight: '700' }}>New Service Request</h2>
            <button style={btnStyle} onClick={() => setShowForm(false)}>← Back</button>
          </div>
          <ServiceRequestForm setShowServices={setShowForm} />
        </>
      )}
    </div>
  );
};

export default UserService;
