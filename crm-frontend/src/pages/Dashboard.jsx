import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Mini CRM Dashboard</h1>
      <div className="btn-group">
        <button onClick={() => navigate('/create')}>Create New Campaign</button>
        <button onClick={() => navigate('/campaigns')}>View Campaigns</button>
        <button onClick={() => navigate('/customer')}>Manage Customers</button>
        <button onClick={() => navigate('/orders')}>Manage Orders</button>

      </div>
    </div>
  );
};

export default Dashboard;
