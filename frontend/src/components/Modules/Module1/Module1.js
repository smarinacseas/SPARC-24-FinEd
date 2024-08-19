import React, { useState, useEffect } from 'react';
import '../AllModules.css';
import './Module1.css';
import PieChart from './Pie_chart.png';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PieChartWithDescription from './PieChart';
import { useNavigate } from 'react-router-dom';


function Module1() {
  const navigate = useNavigate(); // Initialize the navigate function
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
        <div className="content-grid-module1">
          <div className="section motivating_example_m1">
            <div className="section-title">What Impacts Your Credit Score?</div>
            <div className="section-content">
              <p>Hover over each section of the pie chart to learn how different factors influence your credit score:</p>
              <div className="pie-chart-container">
      <PieChartWithDescription />
              </div>
            </div>
          </div>
          <div className="section info_m1 scrollable-section" style={{ maxHeight: '700px' }}>
  <div className="section-title">What Is a Credit Report and Credit Score?</div>
  <div className="section-content">
    <ul>
      <li>A <b>credit report</b> gives potential lenders basic information about you, your accounts, and your payment history. It tracks all credit-related activities (e.g., credit cards, loans, mortgages), and recent activities are given higher weight. Credit reports are generated by three major credit bureaus: Equifax, Experian, and TransUnion. Each bureau may have slightly different information, so it's essential to review all three. Regularly checking your credit report can help you identify and dispute any inaccuracies, detect identity theft early, and maintain a good credit history.</li>
      <li>A <b>credit score</b> (often referred to as a FICO score) is a single, easy-to-read number between 300 and 850 that represents your credit risk to lenders. It’s like an SAT score for the credit industry—the higher your score, the better. This score is calculated based on several factors, including your payment history, the amount of debt you owe, the length of your credit history, new credit inquiries, and the types of credit you have. Lenders use this score, along with other information like your income and employment status, to decide whether to approve your credit applications and determine the interest rates you qualify for.</li>
    </ul>

    <h3>Benefits and Pitfalls of Credit Cards</h3>
    <ul>
      <li><b>Benefit:</b> Credit cards are the fastest way to build and optimize your credit, which can save you thousands in interest on future large purchases like a home or car. Responsible use of credit cards—paying off your balance in full and on time—demonstrates financial reliability to lenders. Additionally, many credit cards offer rewards programs that allow you to earn cashback, points, or miles for your spending, adding value to everyday purchases.</li>

      <li><b>Pitfall:</b> Missing even one payment can lead to significant consequences:
        <ul>
          <li>Your payment history accounts for 35% of your credit score, so missing a payment can cause your credit score to drop significantly, affecting your ability to secure loans or credit in the future.</li>
          <li>Your APR (Annual Percentage Rate) can increase dramatically, sometimes up to 30% or more, making any outstanding debt much more expensive to pay off. Additionally, you'll be charged a late fee, which adds to your debt.</li>
          <li>Repeated late payments can lead to your account being turned over to a collection agency, further damaging your credit score and leading to more severe financial consequences.</li>
        </ul>
      </li>

      <li><b>Pitfall:</b> Paying off only the minimum amount each month:
        <ul>
          <li>Credit card APRs (which often range from 15% to 25%) can cost you much more than what you originally spent over time. Paying only the minimum ensures that interest accumulates on your remaining balance, which can lead to a cycle of debt that is difficult to escape.</li>
          <li>Carrying a high balance on your credit card relative to your credit limit can negatively impact your credit utilization ratio, which accounts for 30% of your credit score. A high utilization rate signals to lenders that you may be overextended, which can lower your score.</li>
        </ul>
      </li>

      <li><b>Benefit:</b> Credit cards can offer strong consumer protections, such as fraud protection, extended warranties, and purchase protection. These benefits can safeguard your finances in case of unauthorized transactions or issues with purchases.</li>
    </ul>

    <h3>Credit Card Commandments:</h3>
    <ul>
      <li><b>Pay off your credit card regularly and in full.</b> Setting up autopay can ensure that you never miss a payment, helping you avoid late fees and potential damage to your credit score. Paying off your balance in full each month also allows you to avoid interest charges, making your credit card an interest-free loan for up to 30 days.</li>

      <li><b>Keep your main cards for a long time, and keep them active.</b> The length of your credit history is an important factor in your credit score. Closing old accounts or letting them go inactive can reduce the average age of your accounts, which can lower your score. Even if you don't use an old card frequently, make small purchases on it occasionally to keep it active.</li>

      <li><b>Use the perks of your card.</b> Many credit cards offer benefits beyond simple credit access, including rewards programs, travel insurance, purchase protection, and extended warranties. Familiarize yourself with the perks your card offers and take advantage of them to maximize the value you receive.</li>

      <li><b>Be mindful of introductory offers and balance transfers.</b> While 0% APR offers and balance transfers can be helpful, they can lead to higher interest rates if you don't pay off the balance before the promotional period ends. Always read the fine print and understand the terms before accepting these offers.</li>

      <li><b>Avoid applying for too many cards at once.</b> Each credit card application results in a hard inquiry on your credit report, which can temporarily lower your credit score. Multiple inquiries in a short period can signal to lenders that you are desperate for credit, which can be a red flag. Apply only for cards you truly need and can manage responsibly.</li>
    </ul>
  </div>
</div>
          <div className="section actions_m1">
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
              <div style={{ marginTop: '20px' }}>
                <button className="go-to-roadmap-button" onClick={() => navigate('/home')}>
                  Go to Roadmap
                </button>
              </div>

            </div>
          </div>
         {/* AI Section */}
         <div className="section ai-advice_m1">
          <div className="section-title">AI Insights</div>
          <div className="section-content">
            <div className="ai-box">
            <p>Which type of credit card is best for my financial situation: rewards, cash back, or low interest?</p>
            <button className="ai_button" onClick={handleGetAdvice}> Consult AI for Personalized Insights</button>
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
    </div>
  );
}

export default Module1;