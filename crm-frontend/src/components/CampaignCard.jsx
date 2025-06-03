import React from 'react';
import './CampaignCard.css';

const CampaignCard = ({ campaign }) => {
  return (
    <div className="campaign-card">
      <h3>{campaign.name}</h3>
      <p>Audience Size: {campaign.audienceSize}</p>
      <p>Sent: {campaign.sent}</p>
      <p>Failed: {campaign.failed}</p>
    </div>
  );
};

export default CampaignCard;
