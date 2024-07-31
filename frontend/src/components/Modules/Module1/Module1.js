import React from 'react';
import './Module1.css';

function Module1() {
  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 1</h1>
        <h2>Credit Cards</h2>
        <div className="content-grid">
          <div className="section motivating-example">
            <div className="section-title">Motivating Example: Why Credit Score is Important</div>
            <div className="section-content">
              <ul>
                <li>Examples on how credit score can impact what you pay on things</li>
                <li>(Consider pulling from some source and live updating a table - for example, the APR on a mortgage)</li>
              </ul>
            </div>
          </div>
          <div className="section info">
            <div className="section-title">Info: What Makes up your Credit Score</div>
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

export default Module1;