import React from 'react';
import './Module5.css';

function Module5() {
  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 5</h1>
        <h2>Investing</h2>
        <div className="content-grid">
          <div className="section motivating-example">
            <div className="section-title">Why Budgeting is Important</div>
            <div className="section-content">
              <p>A budget promotes financial security. By tracking expenses, a budget can make it easier to:</p>
              <ul>
                <li>Pay bills on time</li>
                <li>Establish an emergency fund</li>
                <li>Save for major expenses such as a car, home, education, or a fancy vacation</li>
              </ul>
            </div>
          </div>
          <div className="section info">
            <div className="section-title">How should you budget your money?</div>
            <div className="section-content">
              <p>Set financial goals: Determine what you want to achieve with your budget, such as saving for a vacation, paying off debt, or building an emergency fund.</p>
              <p>Gather Financial Information: Collect your income statements (salary, side jobs) and monthly expenses (rent, utilities, groceries, entertainment).</p>
              <p>Track Expenses: Categorize your monthly expenses into fixed (rent, insurance) and variable (groceries, entertainment) costs. Use apps, spreadsheets, or pen and paper to track where your money goes.</p>
              <p>Create Your Budget: Allocate your income to each expense category. A popular method is the 50/30/20 rule:</p>
              <ul>
                <li>50% for needs (essentials)</li>
                <li>30% for wants (non-essentials)</li>
                <li>20% for savings and debt repayment</li>
              </ul>
              <p>Monitor and Adjust: Regularly review your budget to see if you’re staying on track. Adjust categories and amounts as needed based on changes in income or expenses.</p>
              <p>Review Regularly: Check your budget monthly or quarterly to ensure you’re meeting your financial goals and make adjustments as necessary.</p>
            </div>
          </div>
          <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
              <ol>
                <li>Determine your spending habits (use a budget app).
                <br />
                  Download our <a href="https://docs.google.com/spreadsheets/d/1kHD7R8UNuyHVYkzjfrqkQQqjUeGBK25qOQHIOVrCLRY/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Google Sheet</a> for expense tracking!
                </li>
                <li>Optimize recurring expenses.</li>
                <li>Set priorities and short-term savings goals.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module5;