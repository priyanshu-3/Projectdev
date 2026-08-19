import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="loading-container" aria-label="Loading">
      <div className="spinner"></div>
      <p>Loading habit data...</p>
    </div>
  );
}
