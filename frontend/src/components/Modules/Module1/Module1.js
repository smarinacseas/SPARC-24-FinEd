import React, { useState, useEffect } from 'react';
import './Module1.css';
import PieChart from './Pie_chart.png';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext';

function Module1() {
  const { isAuthenticated, userEmail } = useAuth();
  const [hoveredSection, setHoveredSection] = useState(null);
  // AI Added
  const [checkAI, setAI] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');
  const [typeAdvice, setTypeAdvice] = useState('');

  // State Management:
  const [selectedActions, setSelectedActions] = useState({
    checkCreditReport: false,
    reviewBenefits: false,
    setupAutopay: false,
  });

  const chartSections = [
    { percentage: 35, label: "Payment History", description: "How reliable you are. Late payments hurt you" },
    { percentage: 30, label: "Amounts Owed", description: "“How much you owe and how much credit you have available, aka your credit utilization rate." },
    { percentage: 15, label: "Length of History", description: "How long you've had credit." },
    { percentage: 10, label: "New Credit", description: "“Older accounts are better, because they show you’re reliable. Avoid opening too many new accounts at once." },
    { percentage: 10, label: "Types of Credit", description: "For example, credit cards, student loans. Varied is better." }
  ];

  const getRotationDegrees = (index) => {
    let totalRotation = 0;
    for (let i = 0; i < index; i++) {
      totalRotation += chartSections[i].percentage * 3.6;
    }
    return totalRotation;
  };


  const MyComponent = () => {
    return (
      <div className="image-container">
        <img src={PieChart} alt="Descriptive Alt Text" className="interactive-image" />
      </div>
    );
  };

  // Fetch saved checkbox states from localStorage on component mount
  // useEffect(() => {

  //   const savedActions = localStorage.getItem('module1CheckedItems');
  //   if (savedActions) {
  //     setSelectedActions(JSON.parse(savedActions));
  //   }
  // }, []);


  useEffect(() => {
    // Initialize component
    const initialize = async () => {
      try {
        // Retrieve saved actions from local storage
        const savedActions = localStorage.getItem('module1CheckedItems');
        if (savedActions) {
          setSelectedActions(JSON.parse(savedActions));
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
      setTypeAdvice("mod1_advice"); // Set the advice type based on your logic
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


  // Handle checkbox changes
  const handleCheckboxChange = async (action) => {
    if (!isAuthenticated) {
      console.log('User is not authenticated');
      return;
    }

    setSelectedActions((prev) => {
      const updatedActions = { ...prev, [action]: !prev[action] };
      const totalActions = Object.keys(updatedActions).length;
      const completedActions = Object.values(updatedActions).filter(Boolean).length;
      const progress = (completedActions / totalActions) * 100;
      console.log("progress:",progress);

      updateProgress(updatedActions, progress); // Update progress
      localStorage.setItem('module1CheckedItems', JSON.stringify(updatedActions)); // Save to local storage
      return updatedActions;
    });
  };

  // Progress Update:
  const updateProgress = async (updatedActions, progress) => {
    if (userEmail) {
      try {
        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module1',
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
        <h1>Module 1</h1>
        <h2>Credit Cards</h2>
        <div className="content-grid">
          <div className="section motivating_example">
            <div className="section-title">How to Improve Your Credit Score</div>
            <div className="section-content">
              <p>Hover over the sections of the pie chart to see what impacts your credit score:</p>
              <div className="pie-chart-container">
                <img src={PieChart} alt="Pie Chart" className="interactive-image" />
                <div className="pie-chart">
                  {chartSections.map((section, index) => (
                    <div
                      key={index}
                      className="pie-piece"
                      style={{
                        '--rotate-start': `${getRotationDegrees(index)}deg`,
                        '--rotate-end': `${getRotationDegrees(index) + section.percentage * 3.6}deg`
                      }}
                      onMouseEnter={() => setHoveredSection(section)}
                      onMouseLeave={() => setHoveredSection(null)}
                    ></div>
                  ))}
                  {/* Pie chart code here */}
                </div>
              </div>
              {hoveredSection && (
                <div className="hover-info">
                  <strong>{hoveredSection.label}</strong>: {hoveredSection.description}
                </div>
              )}
            </div>
          </div>
          <div className="section info">
            <div className="section-title">What Is a Credit Report and Credit Score</div>
            <div className="section-content">
              <ul>
                <li>A <b>credit report</b> gives potential lenders basic information about you, your accounts, and your payment history. It tracks all credit-related activities (e.g., credit cards and loans), although recent activities are given higher weight.</li>
                <li>A <b>credit score</b> (FICO score) is a single, easy-to-read number between 300 and 850 that represents your credit risk to lenders. It’s like an SAT score for the credit industry (higher is better). The lenders take this number and, with a few other pieces of information, such as your salary and age, decide if they’ll lend you the money.</li>
              </ul>
              <h3>Benefits and Pitfalls of Credit Cards</h3>
              <ul>
                <li><b>Benefit:</b> Fastest way to optimize your credit, which can save you thousands in interest on future large purchases.</li>
                <li><b>Pitfall:</b> Missing even one payment can lead to consequences like
                  <ul>
                    <li>Your debt payment history represents 30% of your credit score and therefore your credit score can drop.</li>
                    <li>Your APR can go up to 30% and you'll be charged a late fee.</li>
                  </ul>
                </li>
                <li><b>Pitfall:</b> Paying off only the minimum amount each month
                  <ul>
                    <li>Credit card APRs can cost you much more than what you bought over the long term.</li>
                  </ul>
                </li>
              </ul>
              <h3>Credit Card Commandments:</h3>
              <ul>
                <li>Pay off your credit card regularly and in full. Set up autopay!</li>
                <li>Keep your main cards for a long time, and keep them active</li>
                <li>Use the perks of your card</li>
              </ul>
            </div>
          </div>
          <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
              <div>
                <label style={{ opacity: selectedActions.checkCreditReport ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedActions.checkCreditReport}
                    onChange={() => handleCheckboxChange('checkCreditReport')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Check your credit report/credit score.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: selectedActions.checkCreditReport ? 0.5 : 1 }}>
                  You can get a free credit report from <a href="https://www.creditkarma.com/" target="_blank" rel="noopener noreferrer">creditkarma.com</a> and check your credit report for free once a year at <a href="https://www.annualcreditreport.com/index.action" target="_blank" rel="noopener noreferrer">annualcreditreport.com</a>
                </p>
              </div>
              <div>
                <label style={{ opacity: selectedActions.reviewBenefits ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedActions.reviewBenefits}
                    onChange={() => handleCheckboxChange('reviewBenefits')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Review benefits on your current credit card and consider opening a new one.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: selectedActions.reviewBenefits ? 0.5 : 1 }}>
                  Check the benefits on your current credit card and explore options for new cards.
                </p>
              </div>
              <div>
                <label style={{ opacity: selectedActions.setupAutopay ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedActions.setupAutopay}
                    onChange={() => handleCheckboxChange('setupAutopay')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Set up autopay to pay off your credit card in full each month.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: selectedActions.setupAutopay ? 0.5 : 1 }}>
                  Automate your credit card payments to ensure they are paid in full each month.
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
            <p><strong>Which type of credit card is best for my financial situation: rewards, cash back, or low interest?</strong></p>
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

export default Module1;