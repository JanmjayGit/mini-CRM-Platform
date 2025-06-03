import React, { useEffect, useState } from 'react';
import CampaignCard from '../components/CampaignCard';
import './Campaigns.css';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Load campaigns from localStorage
    const stored = JSON.parse(localStorage.getItem('campaigns'));

    if (stored && stored.length > 0) {
      setCampaigns(stored);
    } else {
      // fallback mock data
      const mockCampaigns = [
        { id: 1, name: 'Summer Sale', audienceSize: 1200, sent: 1100, failed: 100 },
        { id: 2, name: 'Winter Promo', audienceSize: 900, sent: 800, failed: 100 },
      ];
      setCampaigns(mockCampaigns);
    }
  }, []);

  return (
    <div className="campaigns-container">
      <h2>Campaign History</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        campaigns.map((c, index) => (
          <CampaignCard
            key={c.id || index}
            campaign={{
              ...c,
              audienceSize: c.rules ? 500 + c.rules.length * 100 : c.audienceSize || 0,
              sent: c.sent || 0,
              failed: c.failed || 0,
            }}
          />
        ))
      )}
    </div>
  );
};

export default Campaigns;
