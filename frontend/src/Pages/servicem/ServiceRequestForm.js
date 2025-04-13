import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ServiceRequestForm = ({ setShowServices }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    productID: '',
    productPurchasedDate: '',
    productWarrantyPeriod: '',
    claimDescription: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      if (!authUser || !authUser._id) {
        toast.error('Please login to submit a service request');
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:5000/services', {
        ...formData,
        user: authUser._id,
      });

      if (response.data.success || response.status === 201) {
        toast.success('Service request submitted successfully!');
        setFormData({
          productName: '',
          productID: '',
          productPurchasedDate: '',
          productWarrantyPeriod: '',
          claimDescription: '',
        });
        if (setShowServices) setShowServices(true);
      }
    } catch (error) {
      console.error('Error submitting service request:', error);
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f9f9f9',
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      animation: 'fadeSlideIn 0.5s ease-in-out',
    }}>
      <style>
        {`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333'
      }}>Submit Service Request</h2>

      <form onSubmit={handleSubmit}>
        {[
          { label: 'Product Name', id: 'productName', type: 'text' },
          { label: 'Product ID', id: 'productID', type: 'text' },
          { label: 'Purchase Date', id: 'productPurchasedDate', type: 'date' },
          { label: 'Warranty Period (months)', id: 'productWarrantyPeriod', type: 'number' }
        ].map(field => (
          <div key={field.id} style={{ marginBottom: '1.25rem' }}>
            <label htmlFor={field.id} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#444' }}>
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              required
              min={field.type === 'number' ? '1' : undefined}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="claimDescription" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#444' }}>
            Description
          </label>
          <textarea
            id="claimDescription"
            name="claimDescription"
            value={formData.claimDescription}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1rem',
              minHeight: '100px',
              resize: 'vertical',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
