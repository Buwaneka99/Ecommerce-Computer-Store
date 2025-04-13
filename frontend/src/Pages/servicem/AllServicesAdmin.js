import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else if (response.data.data) {
          setServices(response.data.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/services/${id}`, { status });
      setServices(prev =>
        prev.map(s => (s._id === id ? { ...s, status } : s))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/services/${id}`);
      setServices(prev => prev.filter(service => service._id !== id));
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  const filteredServices =
    selectedStatus === 'All'
      ? services
      : services.filter(service => service.status === selectedStatus);

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        .hover-highlight:hover {
          background-color: #f0f8ff;
          transition: background-color 0.3s;
        }
      `}</style>

      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>All Service Requests (Admin)</h2>

      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <label style={{ marginRight: '0.5rem' }}>Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
          <tr>
            {['Product', 'User', 'Product ID', 'Purchase Date', 'Warranty', 'Description', 'Status', 'Actions'].map((col) => (
              <th key={col} style={{ padding: '10px', textAlign: 'left', fontWeight: 'normal' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service._id} className="fade-in hover-highlight">
              <td style={{ padding: '10px' }}>{service.productName}</td>
              <td style={{ padding: '10px' }}>{service?.user?.email || 'N/A'}</td>
              <td style={{ padding: '10px' }}>{service.productID}</td>
              <td style={{ padding: '10px' }}>{new Date(service.productPurchasedDate).toLocaleDateString()}</td>
              <td style={{ padding: '10px' }}>{service.productWarrantyPeriod}</td>
              <td style={{ padding: '10px' }}>{service.claimDescription}</td>
              <td style={{ padding: '10px' }}>
                <select
                  value={service.status}
                  onChange={e => handleStatusChange(service._id, e.target.value)}
                  style={{
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor:
                      service.status === 'Pending' ? '#fff3cd' :
                      service.status === 'Done' ? '#d4edda' :
                      '#f8d7da',
                    color:
                      service.status === 'Pending' ? '#856404' :
                      service.status === 'Done' ? '#155724' :
                      '#721c24',
                    border: 'none'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Done">Done</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleDelete(service._id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllServicesAdmin;
