import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceRequestForm from './ServiceRequestForm';
import { FiPlus, FiArrowLeft, FiTrash2, FiHardDrive, FiCalendar, FiClock, FiAlertCircle, FiHash } from 'react-icons/fi';
import { motion } from 'framer-motion';

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
      textTransform: 'capitalize',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    };
    switch (status.toLowerCase()) {
      case 'pending':
        return { ...base, backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' };
      case 'done':
        return { ...base, backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' };
      case 'rejected':
        return { ...base, backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
      default:
        return { ...base, backgroundColor: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {!showForm ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-indigo-400">
                My Service Requests
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
              >
                <FiPlus />
                New Request
              </motion.button>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-4 text-red-400 text-center">
                <FiAlertCircle className="inline-block mr-2" size={20} />
                {error}
              </div>
            ) : services.length === 0 ? (
              <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-8 text-center">
                <h3 className="text-xl text-gray-200 mb-2">No Service Requests Found</h3>
                <p className="text-gray-400">You haven't submitted any service requests yet.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="mt-4 flex items-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-indigo-500/50"
                >
                  <FiPlus />
                  Create Your First Request
                </motion.button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {services.map((service) => (
                  <motion.div
                    key={service._id}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-800/90 border border-gray-700 rounded-xl p-6 hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-700 rounded-lg">
                          <FiHardDrive className="text-indigo-400" size={20} />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {service.productName}
                        </h3>
                      </div>
                      <span style={getStatusColor(service.status)}>
                        {service.status}
                      </span>
                    </div>

                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center gap-2">
                        <FiHash className="text-gray-400" />
                        <span>ID: {service.productID}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" />
                        <span>Purchased: {new Date(service.productPurchasedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="text-gray-400" />
                        <span>Warranty: {service.productWarrantyPeriod} months</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-gray-400 text-sm">{service.claimDescription}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDelete(service._id)}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600/90 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-red-500/50"
                    >
                      <FiTrash2 />
                      Delete Request
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-indigo-400">
                New Service Request
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(false)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-gray-500/50"
              >
                <FiArrowLeft />
                Back to Requests
              </motion.button>
            </div>
            <ServiceRequestForm setShowServices={setShowForm} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserService;