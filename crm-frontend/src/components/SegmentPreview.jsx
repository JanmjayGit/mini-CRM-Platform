import React, { useEffect, useState } from 'react';
import './SegmentPreview.css';

const SegmentPreview = ({ rules }) => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (rules.length) {
      // simulate an API preview call
      setSize(400 + Math.floor(Math.random() * 100));
    } else {
      setSize(0);
    }
  }, [rules]);

  return (
    <div className="segment-preview">
      <p>Estimated Audience Size: {size}</p>
    </div>
  );
};

export default SegmentPreview;