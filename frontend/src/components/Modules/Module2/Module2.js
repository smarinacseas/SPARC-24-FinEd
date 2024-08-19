import React, { useState, useEffect } from 'react';
// import './Module2.css';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext'; // Adjust the import path as necessary

function Module2() {
  const { isAuthenticated, userEmail } = useAuth(); // Retrieve the authenticated user
  const [checkedItems, setCheckedItems] = useState({
    spendingHabits: false,
    setPriorities: false,
    createBudget: false,
  });
  // AI added
  const [checkAI, setAI] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');
  const [typeAdvice, setTypeAdvice] = useState('');

  // useEffect(() => {
  //   const savedCheckedItems = localStorage.getItem('module2CheckedItems');
  //   if (savedCheckedItems) {
  //     setCheckedItems(JSON.parse(savedCheckedItems));
  //   }
  // }, []);

  useEffect(() => {
    // Initialize component
    const initialize = async () => {
      try {
        // Retrieve saved actions from local storage
        const savedCheckedItems = localStorage.getItem('module2CheckedItems');
        if (savedCheckedItems) {
          setCheckedItems(JSON.parse(savedCheckedItems));
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
      setTypeAdvice("mod2_advice"); // Set the advice type based on your logic
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
      console.log("progress:",progress);

      updateProgress(updatedCheckedItems, progress); // Update progress and state
      localStorage.setItem('module2CheckedItems', JSON.stringify(updatedCheckedItems)); // Save to local storage
      return updatedCheckedItems;
    });
  };

  const updateProgress = async (updatedActions, progress) => {
    if (userEmail) {
      try {
        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module2',
          progress: progress,
        });
        console.log('Progress update response:', response);

        // Fetch updated progress to trigger re-render in Header
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    } else {
      console.error('User email or CSRF token is not available');
    }
  };

    // State hooks for the debt calculator
    const [balanceOwed, setBalanceOwed] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthsToPayOff, setMonthsToPayOff] = useState('');
    // Desired months to pay off
    const [desiredMonthsToPayOff, setDesireMonthsToPayOff] = useState('');
  
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
  
    // Comparision Logic
    const [compMesssage, setCompMessage] = useState(null);
  
    // Calculate function
    const handleCalculate = () => {
      if (balanceOwed && interestRate && monthsToPayOff) {
        const principal = parseFloat(balanceOwed);
        const annualInterestRate = parseFloat(interestRate) / 100;
        const months = parseFloat(monthsToPayOff);
        
        // Expected Payment Calculation
        // Monthly interest rate
        const monthlyInterestRate = annualInterestRate / 12;
        
        // Calculate monthly payment
        const payment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months));
        
        // Calculate total payment
        const total = payment * months;
  
        setMonthlyPayment(payment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTotalPayment(total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  
        // Desired Payment Calculation
        const desiredMonths = parseFloat(desiredMonthsToPayOff);
        // Calculate desired monthly payment
        const desiredPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -desiredMonths));
        // Calculate total desired payment
        const totalDesiredPayment = desiredPayment * desiredMonths;
  
        // Comparision Logic
        // If expected months to pay off is greater than desired months
        if (months >= desiredMonths){
          setCompMessage('Congratulations! You are on track to pay off your debt ' + (months - desiredMonths) + ' months sooner than your expected payoff period. \
            You will need to pay an additional $' + parseFloat(desiredPayment - payment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' per month compared to the expected monthly payment. \
            Overall, you will benefit from saving $' + parseFloat(total - totalDesiredPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' in total payments.');
        } else {
          setCompMessage('You will need ' + (desiredMonths - months) + ' additional month(s) to pay off your debt compared to your expected payoff period. \
             Your monthly payment will be $' +  parseFloat(payment - desiredPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' less than the monthly expected payment. Consequently, your overall payment will go up by $' + parseFloat(totalDesiredPayment - total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ".");
        }
      } else {
        alert('Please fill in all required fields.');
      }
    };
  
    const handleReset = () => {
      setBalanceOwed('');
      setInterestRate('');
      setMonthsToPayOff('');
      setDesireMonthsToPayOff('');
      setMonthlyPayment(null);
      setTotalPayment(null);
    };

  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 2</h1>
        <h2>Debt Management</h2>
        <div className="content-grid">
          <div className="section motivating-example">
            <div className="section-title">Emily's Debt Management Success</div>
            <div className="section-content">
              <h5>The Situation:</h5>
                <ul>
                  <li><strong>Debt:</strong> $7,500 credit card debt (20% interest) and $5,000 personal loan (15% interest).</li>
                  <li><strong>Challenge:</strong> Struggling with high interest and stress from debt.</li>
                </ul>
                <h5>The Plan:</h5>
                <ul>
                  <li><strong>Budgeting:</strong> Allocated $500/month to debt repayment.</li>
                  <li><strong>Consolidation:</strong>  Transferred $5,000 of credit card debt to a 0% APR balance transfer card.</li>
                  <li><strong>Negotiation:</strong>  Secured lower interest rates on remaining debt.</li>
                  <li><strong>Emergency Fund:</strong>   Started saving $500 for unexpected expenses.</li>
                  <li><strong>Tracking:</strong>   Monitored progress and adjusted the budget as needed.</li>
                </ul>
                <h5>The Outcome:</h5>
                <ul>
                  <li><strong>First 6 Months:</strong>  Paid off the transferred balance and reduced high-interest debt.</li>
                  <li><strong>12 Months Later:</strong> Eliminated credit card debt and significantly reduced the personal loan.</li>
                  <li><strong>Impact:</strong> Lower stress, better control of finances, started saving for retirement and building a larger emergency fund.</li>
                </ul>
                <h5>Takeaway:</h5> With a clear plan and dedication, Emily successfully managed and reduced her debt, leading to improved financial health and peace of mind.
            </div>
          </div>
          <div className="section info">
            <div className="section-title">What is Debt Management?</div>
            <div className="section-content">
            Debt management involves strategies and practices designed to handle and reduce personal debt effectively. It focuses on organizing, paying off, and ultimately eliminating debts to achieve financial stability and improve overall financial health.
            </div>
          </div>
          <div className="section repayment">
            <h3>Debt Repayment Calculator</h3>
            {/* Debt calculator component here */}
            <p>See how long it could take to pay off your credit card debt.</p>
            <p>Let's start with your details.</p>
            <div className="input-group">
              <label htmlFor="balanceOwed">Balance Owed ($):</label>
              <input
                id="balanceOwed"
                type="number"
                value={balanceOwed}
                onChange={(e) => setBalanceOwed(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="interestRate">Estimated Interest Rate (%):</label>
              <input
                id="interestRate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="monthsToPayOff">Expected Months to Pay Off:</label>
              <input
                id="monthsToPayOff"
                type="number"
                value={monthsToPayOff}
                onChange={(e) => setMonthsToPayOff(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="monthsToPayOff">Desired or Target Months to Pay Off:</label>
              <input
                id="monthsToPayOff"
                type="number"
                value={desiredMonthsToPayOff}
                onChange={(e) => setDesireMonthsToPayOff(e.target.value)}
              />
            </div>
            <button onClick={handleCalculate}>Estimate Your Payment</button>
            <button onClick={handleReset}>Start Over</button>
            {monthlyPayment !== null && totalPayment !== null && (
              <div className="result">
                <h4>Payment Details:</h4>
                <p><strong>Monthly Expected Payment:</strong> ${monthlyPayment}</p>
                <p><strong>Total Expected Payment:</strong> ${totalPayment}</p>
                <p><strong>Comparison:</strong> {compMesssage}</p>
              </div>
            )}
          </div>
          <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
              <div>
                <label style={{ opacity: checkedItems.spendingHabits ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.spendingHabits}
                    onChange={() => handleCheckboxChange('spendingHabits')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Analyze your spending habits.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.spendingHabits ? 0.5 : 1 }}>
                  Review your monthly expenses to identify areas where you can cut back and save.
                </p>
              </div>
              <div>
                <label style={{ opacity: checkedItems.setPriorities ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.setPriorities}
                    onChange={() => handleCheckboxChange('setPriorities')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Set your financial priorities.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.setPriorities ? 0.5 : 1 }}>
                  Decide what is most important to you and allocate funds accordingly.
                </p>
              </div>
              <div>
                <label style={{ opacity: checkedItems.createBudget ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.createBudget}
                    onChange={() => handleCheckboxChange('createBudget')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Create a budget that works for you.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.createBudget ? 0.5 : 1 }}>
                  Plan your monthly income and expenses to ensure you stay on track financially.
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
            <p><strong>What are the most effective strategies for reducing my current debt load?</strong></p>
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

export default Module2;