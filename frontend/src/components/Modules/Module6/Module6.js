import React, { useState, useEffect, useContext } from 'react';
import './Module6.css';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Module6() {
  const { isAuthenticated, userEmail } = useAuth();
  const [checkedItems, setCheckedItems] = useState({
    spendingHabits: false,
    setPriorities: false,
    createBudget: false,
  });

  const [goals, setGoals] = useState({
    priority: '',
    goal: '',
  });

  const [rows, setRows] = useState([
    { description: '', date: '', category: 'Rent/mortgage', amount: '' }
  ]);
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Spending Distribution',
        data: [],
        backgroundColor: [],
      }
    ]
  });

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('module6CheckedItems');
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
  }, []);

  useEffect(() => {
    // Update chart data whenever rows change
    const categoryTotals = rows.reduce((acc, row) => {
      if (row.amount && row.amount > 0) {
        acc[row.category] = (acc[row.category] || 0) + parseFloat(row.amount);
      }
      return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const backgroundColor = labels.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`); // Random colors

    setChartData({
      labels,
      datasets: [
        {
          label: 'Spending Distribution',
          data,
          backgroundColor,
        }
      ]
    });
  }, [rows]);

  const handleCheckboxChange = async (item) => {
    if (!isAuthenticated) {
      console.log('User is not authenticated');
      return;
    }

    setCheckedItems((prev) => {
      const updatedCheckedItems = { ...prev, [item]: !prev[item] };
      const totalActions = Object.keys(updatedCheckedItems).length;
      const completedActions = Object.values(updatedCheckedItems).filter(Boolean).length;
      const progress = (completedActions / totalActions) * 100;

      updateProgress(updatedCheckedItems, progress);
      localStorage.setItem('module6CheckedItems', JSON.stringify(updatedCheckedItems));
      return updatedCheckedItems;
    });
  };

  const updateProgress = async (updatedActions, progress) => {
    if (userEmail) {
      try {
        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module6',
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGoals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const canCheckPriorities = () => {
    return goals.priority.trim() !== '' || goals.goal.trim() !== '';
  };

  const handleRowChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { description: '', date: '', category: 'Rent/mortgage', amount: '' }]);
  };

  const handleRemoveRow = () => {
    if (rows.length > 0) {
      setRows(rows.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    // The chart data is updated automatically via useEffect based on rows
  };

  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 6</h1>
        <h2>Budgeting</h2>
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
              <p><strong>Gather Financial Information:</strong> Collect your income statements (salary, side jobs) and monthly expenses (rent, utilities, groceries, entertainment).</p>
              <p><strong>Track Expenses: </strong> Categorize your monthly expenses into fixed (rent, insurance) and variable (groceries, entertainment) costs. Use apps, spreadsheets, or pen and paper to track where your money goes.</p>
              <p><strong>Create Your Budget: </strong> Allocate your income to each expense category. A popular method is the 50/30/20 rule:</p>
              <ul>
                <li>50% for needs (essentials)</li>
                <li>30% for wants (non-essentials)</li>
                <li>20% for savings and debt repayment</li>
              </ul>
              <p><strong>Monitor and Adjust: </strong> Regularly review your budget to see if you’re staying on track. Adjust categories and amounts as needed based on changes in income or expenses.</p>
              <p><strong>Review Regularly: </strong> Check your budget monthly or quarterly to ensure you’re meeting your financial goals and make adjustments as necessary.</p>
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
                  Use an app or spreadsheet to analyze your spending patterns and identify areas where you can cut back.
                  <br />
                  <a href="https://docs.google.com/spreadsheets/d/1kHD7R8UNuyHVYkzjfrqkQQqjUeGBK25qOQHIOVrCLRY/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Click here for a copy of google sheets tracker</a>
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
                    disabled={!canCheckPriorities()}
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
                  style={{ margin: '5px 0', width: '100%', opacity: checkedItems.setPriorities ? 0.5 : 1, pointerEvents: checkedItems.setPriorities ? 'none' : 'auto' }}
                />
                <input
                  type="text"
                  name="goal"
                  placeholder="Enter your goal"
                  value={goals.goal}
                  onChange={handleInputChange}
                  style={{ margin: '5px 0', width: '100%', opacity: checkedItems.setPriorities ? 0.5 : 1, pointerEvents: checkedItems.setPriorities ? 'none' : 'auto' }}
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
          <div className="section budgeting-grid">
            <div className="section-title">Find out your spendings</div>
            <p className="section-description">
              Let's find out your spending with this form. Look at receipts and bank transactions, and record all your spending for the last 7 days.
            </p>
            <div className="grid-header">
              <div className="header-item">Description</div>
              <div className="header-item">Date</div>
              <div className="header-item">Category</div>
              <div className="header-item">Amount</div>
            </div>           
            <div className="grid-container">
              {rows.map((row, index) => (
                <div key={index} className="grid-row">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={row.description}
                    onChange={(e) => handleRowChange(index, e)}
                  />
                  <input
                    type="date"
                    name="date"
                    value={row.date}
                    onChange={(e) => handleRowChange(index, e)}
                  />
                  <select
                    name="category"
                    value={row.category}
                    onChange={(e) => handleRowChange(index, e)}
                  >
                    <option value="Rent/mortgage">Rent/mortgage</option>
                    <option value="Utilites">Utilites</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Loan Payments">Loan Payments</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Dining out">Dining out</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                    
                  </select>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={row.amount}
                    onChange={(e) => handleRowChange(index, e)}
                  />
                </div>
              ))}
            </div>
            <button onClick={handleAddRow} className="add-row-btn">
              <span>+</span> Add Row
            </button><button onClick={handleRemoveRow} className="remove-row-btn">
              <span>−</span> Remove Row
            </button>
            <button onClick={handleSubmit} className="submit-btn">Submit</button>
          </div>
          <div className="section chart">
            <div className="section-title">Distribution</div>
              <Pie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module6;
