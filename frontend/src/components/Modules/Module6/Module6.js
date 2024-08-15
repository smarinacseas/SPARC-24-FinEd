import React, { useState } from 'react';
import './Module6.css';
import axios from 'axios'; // Import axios for API calls


function Module6() {
  const [checkedItems, setCheckedItems] = useState({
    spendingHabits: false,
    setPriorities: false,
    createBudget: false,
  });

  const [goals, setGoals] = useState({
    priority: '',
    goal: '',
  });

  // Function to handle checkbox changes
  const handleCheckboxChange = async (item) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = { ...prev, [item]: !prev[item] };
      //updateProgress(updatedCheckedItems); // Update progress on checkbox change
      return updatedCheckedItems;
    });
  };

  // Function to update progress in the backend
  //const updateProgress = async (updatedCheckedItems) => {
  //  const totalActions = Object.keys(updatedCheckedItems).length;
  //  const completedActions = Object.values(updatedCheckedItems).filter(Boolean).length;
  //  const progress = (completedActions / totalActions) * 100;

  //  try {
      // Send progress to backend
  //    await axios.post('/api/update-progress', { module: 'module5', progress });
  //  } catch (error) {
  //    console.error('Error updating progress:', error);
  //  }
  //};


  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGoals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if any goal or priority is filled to allow checking the box
  const canCheckPriorities = () => {
    return goals.priority.trim() !== '' || goals.goal.trim() !== '';
  };

  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 6</h1>
        <h2>Budgeting and Expense Tracking</h2>
        <div className="content-grid">
          <div className="section motivating-example">
            <div className="section-title">Importance of Budgeting</div>
            <div className="section-content">
              <p><strong>What is a budget?</strong></p>
              <p>A budget is a financial plan that outlines expected income and expenses over a specific period, helping individuals or organizations manage their money effectively.</p>
              <p><strong>Why is budgeting important?</strong></p>
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
              <p><strong>Set financial goals:</strong> Determine what you want to achieve with your budget, such as saving for a vacation, paying off debt, or building an emergency fund.</p>
              <p><strong>Gather Financial Information:</strong>Collect your income statements (salary, side jobs) and monthly expenses (rent, utilities, groceries, entertainment).</p>
              <p><strong>Track Expenses: </strong>Categorize your monthly expenses into fixed (rent, insurance) and variable (groceries, entertainment) costs. Use apps, spreadsheets, or pen and paper to track where your money goes.</p>
              <p><strong>Create Your Budget: </strong> Allocate your income to each expense category. A popular method is the 50/30/20 rule:</p>
              <ul>
                <li>50% for needs (essentials)</li>
                <li>30% for wants (non-essentials)</li>
                <li>20% for savings and debt repayment</li>
              </ul>
              <p><strong>Monitor and Adjust: </strong>Regularly review your budget to see if you’re staying on track. Adjust categories and amounts as needed based on changes in income or expenses.</p>
              <p><strong>Review Regularly: </strong>Check your budget monthly or quarterly to ensure you’re meeting your financial goals and make adjustments as necessary.</p>
            </div>
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
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Determine your spending habits (use a budgeting app or use our google sheets below).</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.spendingHabits ? 0.5 : 1 }}>
                  Use an app or spreadsheet to anaylze your spending patterns and identify areas where you can cut back.
                  <br />
                  <a href="https://docs.google.com/spreadsheets/d/1kHD7R8UNuyHVYkzjfrqkQQqjUeGBK25qOQHIOVrCLRY/edit?usp=sharingK" target="_blank" rel="noopener noreferrer">Click here for a copy of google sheets tracker</a>
                </p>
              </div>
              <div>
                <label style={{ opacity: checkedItems.setPriorities ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.setPriorities}
                    onChange={() => {
                      if (canCheckPriorities()) {
                        handleCheckboxChange('setPriorities');
                      }
                    }}
                    disabled={!canCheckPriorities()} // Disable checkbox until inputs are filled
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Set priorities and short-term savings goals.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.setPriorities ? 0.5 : 1 }}>
                  Define what’s most important to you financially and set achievable goals to work towards those priorities.
                </p>
                  <input
                    type="text"
                    name="priority"
                    placeholder="Enter your priority"
                    value={goals.priority}
                    onChange={handleInputChange}
                    style={{ margin: '5px 0', width: '100%', opacity: checkedItems.setPriorities ? 0.5 : 1, pointerEvents: checkedItems.setPriorities ? 'none' : 'auto' }} // Disable input if checked
                  />
                  <input
                    type="text"
                    name="goal"
                    placeholder="Enter your goal"
                    value={goals.goal}
                    onChange={handleInputChange}
                    style={{ margin: '5px 0', width: '100%', opacity: checkedItems.setPriorities ? 0.5 : 1, pointerEvents: checkedItems.setPriorities ? 'none' : 'auto' }} // Disable input if checked
                  />
                </div>
              <div>
                <label style={{ opacity: checkedItems.createBudget ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.createBudget}
                    onChange={() => handleCheckboxChange('createBudget')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Create and finalize a budget.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.createBudget ? 0.5 : 1 }}>
                  Develop a detailed budget based on your income and expenses to guide your financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Module6;
