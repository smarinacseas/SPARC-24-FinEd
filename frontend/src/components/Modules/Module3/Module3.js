import React, { useState, useEffect, useContext } from 'react';
import '../AllModules.css'
import './Module3.css';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext';

function Module3() {
  const { isAuthenticated, userEmail } = useAuth();
  const [checkingAmount, setCheckingAmount] = useState('');
  const [savingsAmount, setSavingsAmount] = useState('');
  const [checkingAPY, setCheckingAPY] = useState('');
  const [savingsAPY, setSavingsAPY] = useState('');
  const [checkingAPR, setCheckingAPR] = useState(null);
  const [savingsAPR, setSavingsAPR] = useState(null);
  //const [selectedActions, setSelectedActions] = useState([]);
  const [selectedActions, setSelectedActions] = useState({
    reviewCheckingAccount: false,
    setupDirectDeposits: false,
    openHighInterestSavings: false,
    moveFundsToSavings: false
  });
    // AI added
    const [checkAI, setAI] = useState(false);
    const [aiAdvice, setAiAdvice] = useState('');
    const [typeAdvice, setTypeAdvice] = useState('');

  // useEffect(() => {
  //   const savedActions = localStorage.getItem('module3SelectedActions');
  //   if (savedActions) {
  //     setSelectedActions(JSON.parse(savedActions));
  //   }
  // }, []);
  useEffect(() => {
    // Initialize component
    const initialize = async () => {
      try {
        // Retrieve saved actions from local storage
        const savedCheckedItems = localStorage.getItem('module3CheckedItems');
        if (savedCheckedItems) {
          setSelectedActions(JSON.parse(savedCheckedItems));
        }
        // Call handleGetAdvice if typeAdvice is set
        if (typeAdvice && aiAdvice === '') {
          handleGetAdvice();
        }
      } catch (error) {
        console.error('Error initializing component:', error);
      }
    };
    // Call initialize function
    initialize();
  }, [typeAdvice, aiAdvice]); 

  const handleGetAdvice = async (e) => {
    try {
      setTypeAdvice("mod3_advice"); // Set the advice type based on your logic
      const userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage
      console.log("Fetching data");
      const response = await api.get('/getAdvice', {
        params: {
          user_id: userId,
          advice: typeAdvice
        }
      });
      if (response.status === 200) {
        setAiAdvice(response.data.advice);
      }
      setAI(true); // Update the state to indicate advice has been fetched
    } catch (error) {
      console.error('Error getting AI advice:', error); // Log any errors
    }
  };

  const handleCheckboxChange = async (action) => {
    if (!isAuthenticated) {
      console.log('User is not authenticated');
      return;
    }

    setSelectedActions((prevActions) => {
      const updatedActions = {
        ...prevActions,
        [action]: !prevActions[action]
      };

      const totalActions = Object.keys(updatedActions).length;
      const completedActions = Object.values(updatedActions).filter(Boolean).length;
      const progress = (completedActions / totalActions) * 100;

      updateProgress(updatedActions, progress);
      localStorage.setItem('module3SelectedActions', JSON.stringify(updatedActions));
      return updatedActions;
    });
  };

  const updateProgress = async (updatedActions, progress) => {
    if (userEmail) {
      try {
        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module3',
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

  const calculateCheckingAPR = () => {
    const checkingAPRValue = (parseFloat(checkingAPY) / 100) * parseFloat(checkingAmount);
    setCheckingAPR(isNaN(checkingAPRValue) ? null : checkingAPRValue.toFixed(0));
  };

  const calculateSavingsAPR = () => {
    const savingsAPRValue = (parseFloat(savingsAPY) / 100) * parseFloat(savingsAmount);
    setSavingsAPR(isNaN(savingsAPRValue) ? null : savingsAPRValue.toFixed(0));
  };


  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 3</h1>
        <h2>Bank Accounts</h2>        
        <div className="content-grid">

        <div className="section motivating-example">
            <div className="section-title">APR Calculator</div>
            <div className="section-content">
              <div className="input-group">
                <label>
                  Checking Account Amount:   
                  <input
                    type="number"
                    value={checkingAmount}
                    onChange={(e) => setCheckingAmount(e.target.value)}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Checking Account APY (%):   
                  <input
                    type="number"
                    value={checkingAPY}
                    onChange={(e) => setCheckingAPY(e.target.value)}
                  />
                </label>
              </div>
              <button onClick={calculateCheckingAPR}>Calculate Checking APR</button>
              {checkingAPR !== null && (
                <div>
                  <h3>Checking Account APR: ${checkingAPR}</h3>
                </div>
              )}

              <div className="input-group">
                <label>
                  Savings Account Amount:   
                  <input
                    type="number"
                    value={savingsAmount}
                    onChange={(e) => setSavingsAmount(e.target.value)}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Savings Account APY (%):   
                  <input
                    type="number"
                    value={savingsAPY}
                    onChange={(e) => setSavingsAPY(e.target.value)}
                  />
                </label>
              </div>
              <button onClick={calculateSavingsAPR}>Calculate Savings APR</button>
              {savingsAPR !== null && (
                <div>
                  <h3>Savings Account APR: ${savingsAPR}</h3>
                </div>
              )}
            </div>
          </div>

          <div className="section info">
          <div className="section-title">How to Choose a Bank:</div>
          <div className="section-content">
            <ul>
              <li><b>Trust:</b> No monthly, overdraft or setup fees. No hidden fees.</li>
              <li><b>Convenience:</b> Easy to setup and get money in and out. Good customer service.</li>
              <li><b>Features:</b> Competitive interest rate, free bill paying</li>
            </ul>
            <h3>Checking Account:</h3>
            <ul>
              <li>This is your central hub. All income is filtered through your checking account before moving on to other accounts (savings, investment).</li>
              <li>Choosing a Checking Account:</li>
              <ul>
                <li>If you need to deposit cash: A local bank’s checking account</li>
                <li>If you don’t need to deposit cash: An online no-fee checking account</li>
              </ul>
            </ul>
            <h3>Savings Account:</h3>
            <ul>
              <li>For short to mid-term savings (1-5 years)</li>
              <li>Browse through the bank accounts on <a href="https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/" target="_blank" rel="noopener noreferrer"> bankrate </a> to select one that makes sense to you</li>
            </ul>
          </div>
        </div>

        <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
              <div>
                <label style={{ opacity: selectedActions.reviewCheckingAccount ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedActions.reviewCheckingAccount}
                    onChange={() => handleCheckboxChange('reviewCheckingAccount')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Review your current checking account or open a new one</span>
                </label>
                <p className="action-description" style={{ opacity: selectedActions.reviewCheckingAccount ? 0.5 : 1 }}>
                  Take time to assess your current checking account or explore options for a new one that better suits your needs.
                </p>
              </div>
              <div>
                <label style={{ opacity: selectedActions.setupDirectDeposits ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedActions.setupDirectDeposits}
                    onChange={() => handleCheckboxChange('setupDirectDeposits')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Set up direct deposits to your checking account</span>
                </label>
                <p className="action-description" style={{ opacity: selectedActions.setupDirectDeposits ? 0.5 : 1 }}>
                  Ensure your salary and other income are automatically deposited into your checking account for easier money management.
                </p>
              </div>
              <div>
                <label style={{ opacity: selectedActions.openHighInterestSavings ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedActions.openHighInterestSavings}
                    onChange={() => handleCheckboxChange('openHighInterestSavings')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Open a high-interest savings account</span>
                </label>
                <p className="action-description" style={{ opacity: selectedActions.openHighInterestSavings ? 0.5 : 1 }}>
                  Look for a savings account with high interest rates to maximize your savings over time.
                </p>
              </div>
              <div>
                <label style={{ opacity: selectedActions.moveFundsToSavings ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedActions.moveFundsToSavings}
                    onChange={() => handleCheckboxChange('moveFundsToSavings')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Leave ~2 months of living expenses in your checking account and move the rest to savings</span>
                </label>
                <p className="action-description" style={{ opacity: selectedActions.moveFundsToSavings ? 0.5 : 1 }}>
                  Maintain a buffer of about two months' worth of expenses in your checking account for liquidity, and transfer the remaining funds to your savings account for better returns.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* AI Section */}
        <div className="section ai-advice">
          <div className="section-title">AI Insights</div>
          <div className="section-content">
            <div className="ai-box">
            <p><strong>What are the most effective strategies for managing and allocating funds between my checking and savings accounts?</strong></p>
              <button onClick={handleGetAdvice}>Consult AI for Personalized Insights</button>
              {checkAI && (
              <div className="result">
                <p><strong>AI Advice:</strong> {aiAdvice} </p>
              </div>
            )}
            </div>
          </div>
        </div>
            {/* end AI section */}
      </div>
    </div>
  );
}

export default Module3;