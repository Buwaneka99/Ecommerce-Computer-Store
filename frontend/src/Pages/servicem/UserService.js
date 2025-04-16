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
      padding: '4px 10px',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '0.85rem',
    };
    switch (status.toLowerCase()) {
      case 'pending':
        return { ...base, backgroundColor: '#ffe0b2', color: '#e65100' };
      case 'done':
        return { ...base, backgroundColor: '#c8e6c9', color: '#2e7d32' };
      case 'rejected':
        return { ...base, backgroundColor: '#ffcdd2', color: '#b71c1c' };
      default:
        return { ...base, backgroundColor: '#eeeeee', color: '#333' };
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
    backgroundColor: '#ff6f00', // Orange
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    fontSize: '0.95rem',
    cursor: 'pointer',
  };

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    }}>
      <style>{`
        @keyframes slideFadeIn {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .hover-lift:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
      `}</style>

      {!showForm ? (
        <>
          <div style={headerStyle}>
            <h2 style={{ color: '#000' }}>My Service Requests</h2>
            <button style={btnStyle} onClick={() => setShowForm(true)}>+ New Request</button>
          </div>

          {loading ? (
            <p style={{ color: '#000' }}>Loading your services...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : services.length === 0 ? (
            <p style={{ color: '#555' }}>You haven't submitted any service requests yet.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {services.map((service) => (
                <div
                  key={service._id}
                  className="hover-lift"
                  style={{
                    animation: 'slideFadeIn 0.5s ease',
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '20px', color: '#000' }}>
                      {service.productName}
                    </h3>
                    <span style={getStatusColor(service.status)}>{service.status}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>
                    <p><strong>Product ID:</strong> {service.productID}</p>
                    <p><strong>Purchase Date:</strong> {new Date(service.productPurchasedDate).toLocaleDateString()}</p>
                    <p><strong>Warranty:</strong> {service.productWarrantyPeriod} months</p>
                    <p><strong>Description:</strong> {service.claimDescription}</p>
                  </div>
                  <button
                    style={{ ...btnStyle, backgroundColor: '#d32f2f', marginTop: '10px' }}
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
            <h2 style={{ color: '#000' }}>New Service Request</h2>
            <button style={btnStyle} onClick={() => setShowForm(false)}>← Back</button>
          </div>
          <ServiceRequestForm setShowServices={setShowForm} />
        </>
      )}
    </div>
  );
};

export default UserService;
