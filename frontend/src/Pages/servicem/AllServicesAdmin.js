import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;


const AllServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        setServices(response.data.data || response.data || []);
      } catch (error) {
        setError('Failed to fetch services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
      ...services.map(s => [
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
  

  const filteredServices = selectedStatus === 'All'
    ? services
    : services.filter(service => service.status === selectedStatus);

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', color: '#000' }}>All Service Requests (Admin)</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Filter by Status:</label>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontWeight: '500',
              backgroundColor: '#f9f9f9',
              color: '#000'
            }}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button onClick={generatePDF} style={{
          backgroundColor: '#008080',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Download PDF
        </button>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#008080', color: '#fff' }}>
          <tr>
            <th style={{ padding: '12px' }}>Product</th>
            <th>User</th>
            <th>Product ID</th>
            <th>Purchase Date</th>
            <th>Warranty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{service.productName}</td>
              <td>{service?.user?.email || 'N/A'}</td>
              <td>{service.productID}</td>
              <td>{new Date(service.productPurchasedDate).toLocaleDateString()}</td>
              <td>{service.productWarrantyPeriod} mo</td>
              <td>
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
                    border: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Done">Done</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(service._id)} style={{
                  backgroundColor: '#ff7043',
                  color: '#fff',
                  padding: '6px 10px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
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
