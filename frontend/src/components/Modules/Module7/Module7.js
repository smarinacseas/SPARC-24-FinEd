import React, { useState, useEffect, useContext } from 'react';
import './Module7.css';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext'; // Adjust the import path as necessary
import autopayImage from './autopay.jpg';


function Module7() {
  const { isAuthenticated, userEmail } = useAuth(); // Retrieve the authenticated user
  
  const [checkedItems, setCheckedItems] = useState({
    setupAutomaticTransfers: false,
    setupAutomatedPayments: false,
    //organizeMoney: false,
  });

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('module7CheckedItems');
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
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

  const updateProgress = async (updatedActions, progress) => {
    if (userEmail) {
      try {
        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module7',
          progress: progress,
        });
        console.log('Progress update response:', response);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    } else {
      console.error('User email or CSRF token is not available');
    }
  };

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
              <p>Linking accounts allows for automatic transfers and payments which helps create a self sustaining system. Automating this financial system means setting up processes that automatically manage your money, such as paying bills, saving, and investing, without needing manual intervention.</p>
              <p><strong>Why is this important?</strong></p>
              <ul>
                <li><strong>Reduces Stress:</strong> Automation eliminates the need to remember every financial task, reducing mental load and stress.</li>
                <li><strong>Ensures Consistency:</strong> Regular savings, investments, and bill payments happen without fail, helping you stay on track with your financial goals.</li>
                <li><strong>Prevents Late Fees:</strong> Automating the payments process ensure you never miss a due date, avoiding penalties and interest charges.</li>
              </ul>
            </div>
            <img src={autopayImage} alt="Autopay Photo" style={{ marginTop: '20px', maxWidth: '100%', borderRadius: '8px' }} />
          </div>
          <div className="section setup-and-allocations" >
            <div className="section-title">Setting Up Automatic Transfers</div>
            <div className="section-content">
              <p><strong>How to set up Automatic Transfers?</strong></p>
              <ul>
                <li><strong>Checking Account:</strong> Use this as your core for income deposits</li>
                <li><strong>Savings Transfers:</strong> Set up automatic transfers from your checking account to your savings account(s) each month.</li>
                <li><strong>Credit Card Payment:</strong> Set up automatic payment for credit card payments, ideally paying the full balance each month to avoid debt.</li>
                <li><strong>Bill Payments:</strong> Schedule automatic bill payments for fixed expenses, such as rent, utilities, credit card bills, to avoid late payments.</li>
                <li><strong>Investment Contributions:</strong> Automate regular contributions to your investment accounts, like your 401(k) and Roth IRA.</li>
              </ul>
              <p><strong>Recommended Allocations:</strong></p>
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
          <div className="section actions" >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module7;
