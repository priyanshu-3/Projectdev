import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading habit data...</p>
    </div>
  );
}
