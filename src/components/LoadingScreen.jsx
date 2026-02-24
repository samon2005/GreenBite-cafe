import React from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="logo">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#2F6B4F" />
          <g>
            <rect x="20" y="28" width="24" height="14" rx="7" fill="#fff" />
            <ellipse cx="32" cy="28" rx="12" ry="5" fill="#fff" />
            <path d="M44 35c3 0 5 2 5 4s-2 4-5 4" stroke="#2F6B4F" strokeWidth="2" fill="none" />
            <ellipse cx="32" cy="28" rx="10" ry="3" fill="#2F6B4F" opacity="0.15" />
          </g>
        </svg>
        <h1>GreenBite Café</h1>
      </div>
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingScreen;
