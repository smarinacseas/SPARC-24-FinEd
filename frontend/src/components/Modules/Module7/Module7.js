import React, { useState, useEffect } from 'react';
import './Module7.css';
import axios from 'axios';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext'; // Adjust the import path as necessary

/*
async function fetchCsrfToken() {
  try {
    const response = await axios.get('http://localhost:5000/api/get-csrf-token');
    return response.data.csrfToken; // Adjust based on your backend response
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
}
*/

function Module7() {
  const { isAuthenticated, userEmail } = useAuth(); // Retrieve the authenticated user
  const [checkedItems, setCheckedItems] = useState({
    setupAutomaticTransfers: false,
    setupAutomatedPayments: false,
    organizeMoney: false,
  });
  //const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('module7CheckedItems');
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }

    // Fetch CSRF token on component mount
    //fetchCsrfToken().then(token => setCsrfToken(token));
  }, []);

  const handleCheckboxChange = async (item) => {
    if (!isAuthenticated) {
      console.log('User is not authenticated');
      return; // Prevent further actions if not authenticated
    }

    setCheckedItems((prev) => {
      const updatedCheckedItems = { ...prev, [item]: !prev[item] };
      const totalActions = Object.keys(updatedCheckedItems).length;
      const completedActions = Object.values(updatedCheckedItems).filter(Boolean).length;
      const progress = (completedActions / totalActions) * 100;

      updateProgress(updatedCheckedItems, progress); // Update progress and state
      localStorage.setItem('module7CheckedItems', JSON.stringify(updatedCheckedItems)); // Save to local storage
      return updatedCheckedItems;
    });
  };

  const updateProgress = async (updatedCheckedItems, progress) => {
    if (userEmail) {
      //const payload = { email: userEmail, module: 'module7', progress: progress };
      //const accessToken = localStorage.getItem('accessToken'); 
      try {
        //const response = await api.post('/update-progress', {payload});

        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module7',
          progress: progress,
         })

        /*}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Use the actual token here
            'X-CSRFToken': csrfToken // Include CSRF token if needed
          }
        });
        */

        console.log('Progress update response:', response);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    } else {
      console.error('User email or CSRF token is not available');
    }
  };

  //if (!isAuthenticated) {
  //  return <p>Please log in to access this module.</p>;
  //}

  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 7</h1>
        <h2>Linking Accounts to Create a Self-Sustaining Ecosystem</h2>
        <div className="content-grid">
          <div className="section motivating-example">
            <div className="section-title">Importance of Linking Accounts</div>
            <div className="section-content">
              <p><strong>What does it mean to link accounts?</strong></p>
              <p>Linking accounts allows for automatic transfers and payments, creating a seamless financial ecosystem.</p>
              <p><strong>Why is this important?</strong></p>
              <p>Setting up automatic transfers can help ensure that bills are paid on time, savings goals are met, and investments are funded regularly.</p>
            </div>
          </div>
          <div className="section setup-and-allocations">
            <div className="section-title">Setting Up Automatic Transfers & Recommended Allocations</div>
            <div className="section-content">
              <p>Establish automatic transfers between your checking and savings accounts to build your emergency fund.</p>
              <p>Schedule payments for debts and credit cards to avoid late fees.</p>
              <p>Consider the following percentage allocations based on your budget plan:</p>
              <ul>
                <li><strong>Checking Account:</strong> 10-15% of monthly income for daily expenses and bills.</li>
                <li><strong>Savings (Emergency Fund):</strong> 3-6 months' worth of living expenses, typically around 20% of your income until the goal is reached.</li>
                <li><strong>Retirement:</strong> 15% of your income should be allocated to retirement savings, including 401(k) and IRA contributions.</li>
                <li><strong>Investments:</strong> 10-15% of your income for long-term investments to grow your wealth.</li>
              </ul>
              <p>These percentages can vary based on individual financial situations and goals.</p>
            </div>
          </div>
          <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
              <div>
                <label style={{ opacity: checkedItems.setupAutomaticTransfers ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.setupAutomaticTransfers}
                    onChange={() => handleCheckboxChange('setupAutomaticTransfers')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Set up automatic transfers between accounts.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.setupAutomaticTransfers ? 0.5 : 1 }}>
                  Automate your savings by scheduling regular transfers from your checking account to your savings account or investment accounts.
                </p>
              </div>
              <div>
                <label style={{ opacity: checkedItems.setupAutomatedPayments ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.setupAutomatedPayments}
                    onChange={() => handleCheckboxChange('setupAutomatedPayments')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Set up automated payments for debt and credit cards.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.setupAutomatedPayments ? 0.5 : 1 }}>
                  Ensure timely payments on your debts by automating your monthly payments to avoid interest and penalties.
                </p>
              </div>
              <div>
                <label style={{ opacity: checkedItems.organizeMoney ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.organizeMoney}
                    onChange={() => handleCheckboxChange('organizeMoney')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Organize your money based on your budget plan.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.organizeMoney ? 0.5 : 1 }}>
                  Determine how to allocate your funds for checking, savings (emergency fund), retirement, and investments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module7;
