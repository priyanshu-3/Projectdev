import React from 'react';

function LoadingIndicator({ message = 'Loading...' }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}

export default LoadingIndicator;
