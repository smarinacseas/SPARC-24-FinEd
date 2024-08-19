import React, { useState, useEffect, useContext } from 'react';
import '../AllModules.css'
import './Module3.css';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext';

function Module3() {
  const { isAuthenticated, userEmail } = useAuth();
  const [checkingAmount, setCheckingAmount] = useState(1000)
  const [savingsAmount, setSavingsAmount] = useState(5000);
  const [checkingAPY, setCheckingAPY] = useState(0.5);
  const [savingsAPY, setSavingsAPY] = useState(4.5);
  const [checkingAPR, setCheckingAPR] = useState(null);
  const [savingsAPR, setSavingsAPR] = useState(null);
  //const [selectedActions, setSelectedActions] = useState([]);
  const [selectedActions, setSelectedActions] = useState({
    reviewCheckingAccount: false,
    setupDirectDeposits: false,
    openHighInterestSavings: false,
    moveFundsToSavings: false
  });

  const handleReset = () => {
    setCheckingAmount(1000);
    setSavingsAmount(5000);
    setCheckingAPY(0.5);
    setSavingsAPY(4.5);
    setCheckingAPR(null);
    setSavingsAPR(null);
  };

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
        <div className="content-grid-module3">
        <div className="section motivating-example_m3">
        <div className="section-title">APY Calculator</div>
    <div className="section-content">
      <p>This tool helps you calculate the interest you can earn on your checking and savings accounts based on the account balances and their respective APY (Annual Percentage Yield). By entering the amount in your accounts and the APY, you can estimate the annual earnings for each account.</p>

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
      <button className="apy_button" onClick={calculateCheckingAPR}>Calculate Checking APY</button>

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
      <button className="apy_button" onClick={calculateSavingsAPR}>Calculate Savings APY</button>
      <div>
        <h5>Checking Account APY: {checkingAPR !== null ? `$${checkingAPR}` : ''}</h5>
        <h5>Savings Account APY: {savingsAPR !== null ? `$${savingsAPR}` : ''}</h5>
      </div>

      {/* Start Over Button */}
      <button className="reset_button" onClick={handleReset}>Start Over</button>
    </div>
          </div>
          <div className="section info_m3 scrollable-section" style={{ maxHeight: '750px' }}>
  <div className="section-title">How to Choose a Bank:</div>
  <div className="section-content">
    <ul>
      <li><b>Trust:</b> Look for a bank with no monthly, overdraft, or setup fees, and ensure there are no hidden fees. Consider the bank's reputation and read reviews to understand customer experiences. Opt for banks that are FDIC-insured, which protects your deposits up to $250,000.</li>
      <li><b>Convenience:</b> Choose a bank that offers easy account setup, straightforward money transfers, and good customer service. Consider the availability of ATMs and branches if you frequently need in-person banking services. For tech-savvy users, a bank with a user-friendly mobile app and online banking services can be a significant advantage.</li>
      <li><b>Features:</b> Evaluate the bank’s interest rates, especially if you plan to keep a substantial balance in your accounts. Look for additional features such as free bill pay services, cashback offers, rewards programs, and the ability to set up automatic transfers to savings or investment accounts. Consider whether the bank offers budgeting tools, financial advice, or personalized account management services.</li>
      <li><b>Security:</b> Ensure the bank provides robust security features, including two-factor authentication, fraud monitoring, and zero-liability policies for unauthorized transactions. Check how quickly the bank responds to security breaches and whether they offer identity theft protection services.</li>
    </ul>

    <h3>Checking Account:</h3>
    <ul>
      <li>This is your central hub where all income is deposited and managed before being distributed to other accounts, such as savings or investment accounts. A checking account is ideal for daily transactions, such as paying bills, withdrawing cash, and making purchases.</li>
      <li>Considerations when choosing a Checking Account:</li>
      <ul>
        <li><b>Cash Deposits:</b> If you regularly need to deposit cash, opt for a checking account with a local or regional bank that offers easy access to ATMs and branches. Check for any fees associated with cash deposits or withdrawals.</li>
        <li><b>No Cash Deposits:</b> If you don’t need to deposit cash, an online no-fee checking account could be more beneficial. These accounts often offer better interest rates and lower fees compared to traditional banks, and they typically come with extensive online and mobile banking features.</li>
        <li><b>Overdraft Protection:</b> Consider whether the bank offers overdraft protection and what fees are associated with it. Some banks offer free or low-cost overdraft protection by linking your checking account to a savings account or credit card.</li>
        <li><b>Minimum Balance Requirements:</b> Be aware of any minimum balance requirements to avoid monthly maintenance fees. Choose an account that aligns with your typical account balance and transaction needs.</li>
        <li><b>Interest-Bearing Accounts:</b> Some checking accounts offer interest on your balance, although the rates are usually lower than savings accounts. This can be a good option if you maintain a high balance in your checking account.</li>
      </ul>
    </ul>

    <h3>Savings Account:</h3>
    <ul>
      <li>Savings accounts are ideal for short- to mid-term savings goals (1-5 years), such as an emergency fund, a vacation, or a down payment on a house. They offer better interest rates than checking accounts, helping your money grow over time.</li>
      <li>Considerations when choosing a Savings Account:</li>
      <ul>
        <li><b>Interest Rates:</b> Look for high-yield savings accounts that offer competitive interest rates. Online banks often offer higher rates than traditional banks due to lower overhead costs.</li>
        <li><b>Access to Funds:</b> Evaluate how quickly you can access your funds if needed. Some savings accounts limit the number of withdrawals per month, and exceeding this limit could incur fees.</li>
        <li><b>Automatic Transfers:</b> Consider setting up automatic transfers from your checking account to your savings account to ensure consistent savings. Some banks offer “round-up” programs that automatically transfer spare change from purchases into your savings account.</li>
        <li><b>Additional Features:</b> Some savings accounts offer features such as sub-accounts for different savings goals, goal-setting tools, and personalized financial advice.</li>
        <li><b>Account Fees:</b> Be aware of any maintenance fees or minimum balance requirements. Many online savings accounts have no fees or minimums, making them a good option for growing your savings.</li>
      </ul>
      <li>Browse through the bank accounts on <a href="https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/" target="_blank" rel="noopener noreferrer">Bankrate</a> to select one that makes sense for you based on your financial goals and needs.</li>
    </ul>

    <h3>Additional Tips:</h3>
    <ul>
      <li><b>Bundle Services:</b> Some banks offer perks if you bundle multiple services, such as checking, savings, credit cards, and loans. This can include lower fees, higher interest rates, or cashback rewards.</li>
      <li><b>Compare Offers:</b> Don’t hesitate to compare offers from different banks. Use online tools and resources like Bankrate, NerdWallet, or Credit Karma to compare fees, interest rates, and features.</li>
      <li><b>Consider Credit Unions:</b> Credit unions often offer lower fees, better interest rates, and a more personalized banking experience compared to traditional banks. They are member-owned and focused on providing value to their members.</li>
      <li><b>Read the Fine Print:</b> Always read the terms and conditions before opening an account. Be aware of any potential fees, rate changes, or limitations that could affect your banking experience.</li>
    </ul>
  </div>
</div>

        <div className="section actions_m3">
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

        {/* AI Section */}
        <div className="section ai-advice_m3">
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
        </div>
            {/* end AI section */}
      </div>
    </div>
  );
}

export default Module3;