import React, { useState } from 'react';
import '../AllModules.css'
import './Module1.css';
import PieChart from './Pie_chart.png';


function Module1() {

  const [hoveredSection, setHoveredSection] = useState(null);

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
  const [selectedActions, setSelectedActions] = useState([]);

  const MyComponent = () => {
    return (
      <div className="image-container">
        <img src={PieChart} alt="Descriptive Alt Text" className="interactive-image" />
      </div>
    );
  };
  
  const handleCheckboxChange = (action) => {
    setSelectedActions(prevActions =>
      prevActions.includes(action)
        ? prevActions.filter(a => a !== action)
        : [...prevActions, action]
    );
  };

  return (
    <div className="module-container">
    <div className="main-content">
      <h1>Module 1</h1>
      <h2>Credit Cards</h2>
      <div className="content-grid">
        <div className="section motivatin_example">
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
                <li><b>Benefit:</b> Fastest way to optimize your credit, which can save you thousands in interest on future large purchases. </li>
                <li><b>Pitfall:</b>Missing even one payment can lead to consequences like</li>
                <ul>
                <li>Your debt payment history represents 30% of your credit score and therefore your credit score can drop  </li>
                <li>Your APR can go up to 30% and you'll be charged a late fee</li>
              </ul>
              <li><b>Pitfall:</b>Paying off only the minimum amount each month</li>
                <ul>
                <li>Credit card APRs can cost you much more than what you bought over the long term</li>
              </ul>
              </ul>
              <h3>Credit Card Commandments:</h3>
              <ul>
                <li>Pay off your credit card regularly and in full. Set up autopay!</li>
                <ul>
                  <li>Don’t worry if you don’t always have enough money in your checking account to pay off the full amount on your credit card. You’ll get a statement from your card company each month before the payment goes through so that you can adjust your payment as needed.</li>
                </ul>
                <li>Keep your main cards for a long time, and keep them active</li>
                <li>Use the perks of your card</li>
              </ul>
            </div>
          </div>
          <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
              <form>
                <div>
                  <input
                    type="checkbox"
                    id="action1"
                    name="actions"
                    value="Check your credit report/credit score."
                    checked={selectedActions.includes("Check your credit report/credit score.")}
                    onChange={() => handleCheckboxChange("Check your credit report/credit score.")}
                  />
                  <label htmlFor="action1">Check your credit report/credit score. You can get a free credit report from <a href="https://www.creditkarma.com/" target="_blank" rel="noopener noreferrer"> creditkarma.com. </a> and you can check your credit report for free once a year at <a href="https://www.annualcreditreport.com/index.action" target="_blank" rel="noopener noreferrer"> annualcreditreport.com. </a></label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="action2"
                    name="actions"
                    value="Review benefits on your current credit card and consider opening a new one."
                    checked={selectedActions.includes("Review benefits on your current credit card and consider opening a new one.")}
                    onChange={() => handleCheckboxChange("Review benefits on your current credit card and consider opening a new one.")}
                  />
                  <label htmlFor="action2">Review benefits on your current credit card and consider opening a new one.</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="action3"
                    name="actions"
                    value="If financially feasible, set up autopay to pay off your credit card in full each month."
                    checked={selectedActions.includes("If financially feasible, set up autopay to pay off your credit card in full each month.")}
                    onChange={() => handleCheckboxChange("If financially feasible, set up autopay to pay off your credit card in full each month.")}
                  />
                  <label htmlFor="action3">Set up autopay to pay off your credit card in full each month.  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module1;