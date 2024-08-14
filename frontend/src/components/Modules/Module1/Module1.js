import React, { useState } from 'react';
import './Module1.css';

function Module1() {
  const [selectedActions, setSelectedActions] = useState([]);

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
            <div className="section-title">What Is a Credit Report and Credit Score</div>
            <div className="section-content">
              <ul>
                <li>A credit report gives potential lenders basic information about you, your accounts, and your payment history. It tracks all credit-related activities (e.g., credit cards and loans), although recent activities are given higher weight.</li>
                <li>A credit score (FICO score) is a single, easy-to-read number between 300 and 850 that represents your credit risk to lenders. It’s like an SAT score for the credit industry (higher is better). The lenders take this number and, with a few other pieces of information, such as your salary and age, decide if they’ll lend you the money.</li>
                <li>Length of account (keep credit cards open as long as possible).</li>
              </ul>
            </div>
          </div>
          <div className="section info2">
            <div className="section-title">How to Improve Your Credit Score</div>
            <div className="section-content">
            NOTE: trying to make this a hover-able pie chart where the hover shows you what you need to do to improve<br />
            What is your credit score based on?

              <ul>
                <li>35% payment history</li>
                <li>30% amounts owed</li>
                <li>15% length of history</li>
                <li>10% new credit</li>
                <li>10% types of credit</li>
              </ul>
            </div>
          </div>
          <div className="section info3">
            <div className="section-title">Benefits of Using Credit Cards</div>
            <div className="section-content">
              <ul>
                <li>Fastest way to optimize your credit</li>
                <li>Credit cards give you thousands of dollars worth of perks</li>
              </ul>
            </div>
          </div>
          <div className="section info4">
            <div className="section-title">Credit Card Commandments</div>
            <div className="section-content">
              <ul>
                <li>Pay off your credit card regularly. (autopay)</li>
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
                  <label htmlFor="action1">Check your credit report/credit score.</label>
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
                  <label htmlFor="action3">If financially feasible, set up autopay to pay off your credit card in full each month.</label>
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
