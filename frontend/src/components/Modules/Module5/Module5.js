import React from 'react';
import './Module5.css';

function Module5() {
  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 5</h1>
        <h2>Investing</h2>
        <div className="content-grid">
          <div className="section motivating-example">
            <div className="section-title">Motivating Example</div>
            <div className="section-content">
            </div>
          </div>
          <div className="section info">
            <div className="section-title">Info: </div>
            <div className="section-content">
              {/* Add content here */}
            </div>
          </div>
          <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
              {/* Add content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module5;