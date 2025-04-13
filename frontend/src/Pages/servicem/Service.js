import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './s.css';

const Service = () => {
  const navigate = useNavigate();

  return (
    <div className="service-container">
      <h2>Service Center</h2>
      <div className="service-buttons">
        <button 
          className="service-btn new-service"
          onClick={() => navigate('/user/service/request')}
        >
          New Service
        </button>
        <button 
          className="service-btn my-services"
          onClick={() => navigate('/user/service/previous-claims')}
        >
          My Services
        </button>
      </div>
    </div>
  );
};

export default Service; 