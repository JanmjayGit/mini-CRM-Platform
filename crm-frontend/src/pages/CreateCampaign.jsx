import React from 'react';
import CampaignForm from '../components/CampaignForm';
import './CreateCampaign.css';
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const existing = JSON.parse(localStorage.getItem('campaigns')) || [];
    const updated = [...existing, { ...data, id: Date.now() }];
    localStorage.setItem('campaigns', JSON.stringify(updated));
    console.log('Campaign Created:', data);
    alert('Campaign Created Successfully!');
    navigate('/campaigns');
  };

  return (
    <div className="create-campaign-container">
      <h2>Create New Campaign</h2>
      <CampaignForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCampaign;
