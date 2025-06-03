import React from 'react';
import './RuleBuilder.css';

const RuleBuilder = ({ rules = [], setRules }) => {
  const handleAddRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const handleRuleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [key]: value }; // immutably update rule
    setRules(updated);
  };

  const handleRemoveRule = (index) => {
    const updated = rules.filter((_, i) => i !== index); // cleaner removal
    setRules(updated);
  };

  return (
    <div className="rule-builder">
      <h3>Build Audience Rules</h3>
      {rules.length === 0 && <p>No rules added yet.</p>}
      {rules.map((rule, index) => (
        <div className="rule-row" key={index}>
          <select
            value={rule.field}
            onChange={e => handleRuleChange(index, 'field', e.target.value)}
          >
            <option value="">Field</option>
            <option value="spend">Spend</option>
            <option value="visits">Visits</option>
            <option value="inactive_days">Inactive Days</option>
          </select>
          <select
            value={rule.operator}
            onChange={e => handleRuleChange(index, 'operator', e.target.value)}
          >
            <option value="">Operator</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="=">=</option>
          </select>
          <input
            type="number"
            placeholder="Value"
            value={rule.value}
            onChange={e => handleRuleChange(index, 'value', e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveRule(index)}>X</button>
        </div>
      ))}
      <button type="button" onClick={handleAddRule}>+ Add Rule</button>
    </div>
  );
};

export default RuleBuilder;
