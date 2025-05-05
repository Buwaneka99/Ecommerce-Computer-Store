import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FiSearch, FiDownload } from 'react-icons/fi';

pdfMake.vfs = pdfFonts.vfs;

const AllServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        const servicesData = response.data.data || response.data || [];
        setServices(servicesData);
        setFilteredServices(servicesData);
      } catch (error) {
        setError('Failed to fetch services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    let results = services;
    
    // Apply status filter first
    if (selectedStatus !== 'All') {
      results = results.filter(service => service.status === selectedStatus);
    }
    
    // Then apply search filter
    if (searchTerm) {
      results = results.filter(service =>
        service.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service?.user?.email && service.user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        service.productID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredServices(results);
  }, [searchTerm, selectedStatus, services]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/services/${id}`, { status });
      setServices(prev => prev.map(s => (s._id === id ? { ...s, status } : s)));
    } catch {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/services/${id}`);
      setServices(prev => prev.filter(service => service._id !== id));
    } catch {
      alert("Failed to delete service");
    }
  };

  const getChartImageBase64 = async (pending, done, rejected) => {
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
      type: 'bar',
      data: {
        labels: ['Pending', 'Done', 'Rejected'],
        datasets: [{
          label: 'Status Count',
          data: [pending, done, rejected],
          backgroundColor: ['#ffc107', '#28a745', '#dc3545']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ffffff'
            }
          }
        },
        backgroundColor: 'transparent',
        color: '#ffffff'
      }
    }))}`;
  
    const response = await fetch(chartUrl);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const generatePDF = async () => {
    const pending = services.filter(s => s.status === 'Pending').length;
    const done = services.filter(s => s.status === 'Done').length;
    const rejected = services.filter(s => s.status === 'Rejected').length;
  
    const chartBase64 = await getChartImageBase64(pending, done, rejected);
  
    const tableBody = [
      ['Product', 'User', 'Product ID', 'Purchase Date', 'Warranty', 'Status'],
      ...filteredServices.map(s => [
        s.productName,
        s?.user?.email || 'N/A',
        s.productID,
        new Date(s.productPurchasedDate).toLocaleDateString(),
        `${s.productWarrantyPeriod} mo`,
        s.status
      ])
    ];
  
    const docDefinition = {
      content: [
        { text: 'All Service Requests Report', style: 'header' },
        {
          text: `Status Counts:\nPending: ${pending}, Done: ${done}, Rejected: ${rejected}`,
          margin: [0, 0, 0, 10]
        },
        {
          image: chartBase64,
          width: 400,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto', 'auto', 'auto'],
            body: tableBody
          }
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          marginBottom: 10
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).download('Service_Report.pdf');
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      backgroundImage: 'url(https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop)',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(30, 30, 40, 0.85)',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#fff',
          marginBottom: '1.5rem',
          fontSize: '2rem',
          fontWeight: '600',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Service Requests Dashboard
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <FiSearch style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#aaa'
              }} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px 12px 8px 32px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  fontWeight: '500',
                  backgroundColor: '#333',
                  color: '#fff',
                  minWidth: '250px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{
                fontWeight: '500',
                color: '#ddd'
              }}>
                Filter by Status:
              </label>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  fontWeight: '500',
                  backgroundColor: '#333',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <button
            onClick={generatePDF}
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#45a049',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <FiDownload />
            Export PDF
          </button>
        </div>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            color: '#fff'
          }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{
            color: '#ff6b6b',
            textAlign: 'center',
            padding: '2rem'
          }}>
            {error}
          </div>
        ) : (
          <div style={{
            overflowX: 'auto',
            borderRadius: '8px',
            border: '1px solid #444'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'rgba(40, 40, 50, 0.7)',
              color: '#fff'
            }}>
              <thead style={{
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                color: '#fff',
                position: 'sticky',
                top: 0
              }}>
                <tr>
                  <th style={{ padding: '14px 16px', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left' }}>User</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left' }}>Product ID</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left' }}>Purchase Date</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left' }}>Warranty</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <tr
                    key={service._id}
                    style={{
                      borderBottom: '1px solid #444',
                      ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                  >
                    <td style={{ padding: '12px 16px' }}>{service.productName}</td>
                    <td style={{ padding: '12px 16px' }}>{service?.user?.email || 'N/A'}</td>
                    <td style={{ padding: '12px 16px' }}>{service.productID}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {new Date(service.productPurchasedDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px 16px' }}>{service.productWarrantyPeriod} mo</td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={service.status}
                        onChange={e => handleStatusChange(service._id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          backgroundColor:
                            service.status === 'Pending' ? 'rgba(255, 193, 7, 0.2)' :
                            service.status === 'Done' ? 'rgba(40, 167, 69, 0.2)' :
                            'rgba(220, 53, 69, 0.2)',
                          color: '#fff',
                          border: '1px solid #555',
                          fontWeight: '500',
                          cursor: 'pointer',
                          ':focus': {
                            outline: 'none',
                            borderColor: '#4CAF50'
                          }
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(service._id)}
                        style={{
                          backgroundColor: 'rgba(220, 53, 69, 0.7)',
                          color: '#fff',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                          ':hover': {
                            backgroundColor: 'rgba(220, 53, 69, 0.9)'
                          }
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
        )}

        {!loading && filteredServices.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#aaa'
          }}>
            {searchTerm || selectedStatus !== 'All' 
              ? 'No matching services found' 
              : 'No service requests found'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServicesAdmin;