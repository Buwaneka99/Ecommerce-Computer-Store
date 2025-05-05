import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiHardDrive, FiCalendar, FiHash, FiEdit2, FiClock } from 'react-icons/fi';

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
    <div
      className="min-h-screen bg-cover bg-fixed bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-gray-800/95 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transform transition-all duration-500 hover:shadow-blue-500/20">
          {/* Header with back button */}
          <div className="px-6 py-5 border-b border-gray-700 flex items-center bg-gradient-to-r from-gray-800 to-gray-900">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
            >
              <FiArrowLeft className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-blue-400 text-center flex-1">
              Service Request
            </h2>
            <div className="w-6"></div>
          </div>

          {/* Form with animated inputs */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {/* Product Name */}
            <div className="group animate-fade-in-up">
              <label className="block text-gray-300 text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200">
                Product Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-300 transition-colors duration-200">
                  <FiHardDrive className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-400/50"
                  placeholder="e.g., Gaming Laptop"
                />
              </div>
            </div>

            {/* Product ID */}
            <div className="group animate-fade-in-up animation-delay-100">
              <label className="block text-gray-300 text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200">
                Product ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-300 transition-colors duration-200">
                  <FiHash className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="productID"
                  name="productID"
                  value={formData.productID}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-400/50"
                  placeholder="e.g., SN-12345678"
                />
              </div>
            </div>

            {/* Purchase Date */}
            <div className="group animate-fade-in-up animation-delay-200">
              <label className="block text-gray-300 text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200">
                Purchase Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-300 transition-colors duration-200">
                  <FiCalendar className="h-5 w-5" />
                </div>
                <input
                  type="date"
                  id="productPurchasedDate"
                  name="productPurchasedDate"
                  value={formData.productPurchasedDate}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-400/50"
                />
              </div>
            </div>

            {/* Warranty Period */}
            <div className="group animate-fade-in-up animation-delay-300">
              <label className="block text-gray-300 text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200">
                Warranty Period (months)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-300 transition-colors duration-200">
                  <FiClock className="h-5 w-5" />
                </div>
                <input
                  type="number"
                  id="productWarrantyPeriod"
                  name="productWarrantyPeriod"
                  value={formData.productWarrantyPeriod}
                  onChange={handleChange}
                  required
                  min="1"
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-400/50"
                  placeholder="e.g., 12"
                />
              </div>
            </div>

            {/* Description */}
            <div className="group animate-fade-in-up animation-delay-400">
              <label className="block text-gray-300 text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200">
                Issue Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 text-gray-400 group-hover:text-blue-300 transition-colors duration-200">
                  <FiEdit2 className="h-5 w-5" />
                </div>
                <textarea
                  id="claimDescription"
                  name="claimDescription"
                  value={formData.claimDescription}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-400/50 min-h-[140px]"
                  placeholder="Describe the issue you're experiencing..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Request'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default ServiceRequestForm;