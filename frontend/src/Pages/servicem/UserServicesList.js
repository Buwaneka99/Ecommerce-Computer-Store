/*This component only shows the list of the logged-in user's service requests.

Key Features:
No form included.

No button to add new service.

Purely a read-only view of service requests.

Simpler and more focused than UserService.*/ 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserServices();
  }, []);

  const fetchUserServices = async () => {
    try {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const userId = authUser?._id;

      if (!userId) {
        toast.error("Please login to view your services");
        return;
      }

      const response = await axios.get(`http://localhost:5000/services/get-user-service/${userId}`);
      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 10px',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '14px',
    };
    switch (status.toLowerCase()) {
      case 'pending':
        return { ...baseStyle, backgroundColor: '#fff3cd', color: '#856404' };
      case 'done':
        return { ...baseStyle, backgroundColor: '#d4edda', color: '#155724' };
      case 'rejected':
        return { ...baseStyle, backgroundColor: '#f8d7da', color: '#721c24' };
      default:
        return { ...baseStyle, backgroundColor: '#e2e3e5', color: '#6c757d' };
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '18px' }}>Loading your services...</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>No Service Requests</h3>
        <p>You haven't submitted any service requests yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>My Service Requests</h2>
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
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              transition: '0.3s ease',
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
              <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{service.productName}</h3>
              <span style={getStatusStyle(service.status)}>{service.status}</span>
            </div>
            <div style={{ fontSize: '15px', color: '#555' }}>
              <p><strong>Product ID:</strong> {service.productID}</p>
              <p><strong>Purchase Date:</strong> {new Date(service.productPurchasedDate).toLocaleDateString()}</p>
              <p><strong>Warranty Period:</strong> {service.productWarrantyPeriod} months</p>
              <p><strong>Description:</strong> {service.claimDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserServicesList;
