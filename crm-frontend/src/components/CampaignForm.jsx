import React, { useState } from 'react';
import RuleBuilder from './RuleBuilder';
import SegmentPreview from './SegmentPreview';
import './CampaignForm.css';

const CampaignForm = ({ onSubmit }) => {
  const [rules, setRules] = useState([]);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload
    if (!name) {
      alert('Please enter a campaign name');
      return;
    }
    if (rules.length === 0) {
      alert('Please add at least one rule');
      return;
    }
    onSubmit({ name, rules });
  };

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Campaign Name"
        className="campaign-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <RuleBuilder rules={rules} setRules={setRules} />
      <SegmentPreview rules={rules} />
      <button type="submit" className="campaign-submit-btn">
        Create Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
