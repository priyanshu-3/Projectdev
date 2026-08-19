import React from 'react';

function LoadingIndicator() {
  return (
    <div className="loading-indicator" data-testid="loading-indicator">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingIndicator;
