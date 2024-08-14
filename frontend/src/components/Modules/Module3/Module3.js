import React, { useState } from 'react';
import './Module3.css';

function Module3() {
  const [checkingAmount, setCheckingAmount] = useState('');
  const [savingsAmount, setSavingsAmount] = useState('');
  const [checkingAPY, setCheckingAPY] = useState('');
  const [savingsAPY, setSavingsAPY] = useState('');
  const [checkingAPR, setCheckingAPR] = useState(null);
  const [savingsAPR, setSavingsAPR] = useState(null);
  const [selectedActions, setSelectedActions] = useState([]);

  const calculateAPR = () => {
    const checkingAPRValue = (parseFloat(checkingAPY) / 100) * parseFloat(checkingAmount);
    const savingsAPRValue = (parseFloat(savingsAPY) / 100) * parseFloat(savingsAmount);
    setCheckingAPR(isNaN(checkingAPRValue) ? null : checkingAPRValue.toFixed(0));
    setSavingsAPR(isNaN(savingsAPRValue) ? null : savingsAPRValue.toFixed(0));
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
        <h1>Module 3</h1>
        <h2>Bank Accounts</h2>
        <div className="content-grid">
          <div className="section apr-calculator">
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
                  Checking Account APY (%):   
                  <input
                    type="number"
                    value={checkingAPY}
                    onChange={(e) => setCheckingAPY(e.target.value)}
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
              <button onClick={calculateAPR}>Calculate APR</button>
              {checkingAPR !== null && (
                <div>
                  <h3>Checking Account APR: ${checkingAPR}</h3>
                </div>
              )}
              {savingsAPR !== null && (
                <div>
                  <h3>Savings Account APR: ${savingsAPR}</h3>
                </div>
              )}
            </div>
          </div>
          <div className="section how-to-choose">
            <div className="section-title">How to Choose a Bank:</div>
            <div className="section-content">
              Trust: No monthly, overdraft or setup fees. No hidden fees.<br />
              Convenience: Easy to setup and get money in and out. Good customer service.<br />
              Features: Competitive interest rate, free bill paying
            </div>
          </div>
          <div className="section checking-account">
            <div className="section-title">Checking Account</div>
            <div className="section-content">
              A money hub. All income is filtered through your checking account before moving on to other accounts (savings, investment)<br />
              <br />
              Choosing a Checking Account:<br />
              If you need to deposit cash:<br />
              - A local bank’s checking account<br />
              If you don’t need to deposit cash:<br />
              - An online no-fee checking account
            </div>
          </div>
          <div className="section savings-account">
            <div className="section-title">Savings Account</div>
            <div className="section-content">
              For short to mid-term savings (1-5 years)<br />
              Browse through the bank accounts on bankrate to select one that makes sense to you

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
                    value="Review your current checking account or open a new one"
                    checked={selectedActions.includes("Review your current checking account or open a new one")}
                    onChange={() => handleCheckboxChange("Review your current checking account or open a new one")}
                  />
                  <label htmlFor="action1">Review your current checking account or open a new one</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="action2"
                    name="actions"
                    value="Set up direct deposits to your checking account"
                    checked={selectedActions.includes("Set up direct deposits to your checking account")}
                    onChange={() => handleCheckboxChange("Set up direct deposits to your checking account")}
                  />
                  <label htmlFor="action2">Set up direct deposits to your checking account</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="action3"
                    name="actions"
                    value="Open a high-interest savings account"
                    checked={selectedActions.includes("Open a high-interest savings account")}
                    onChange={() => handleCheckboxChange("Open a high-interest savings account")}
                  />
                  <label htmlFor="action3">Open a high-interest savings account</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="action4"
                    name="actions"
                    value="Leave ~2 months of living expenses in your checking account and move the rest to savings"
                    checked={selectedActions.includes("Leave ~2 months of living expenses in your checking account and move the rest to savings")}
                    onChange={() => handleCheckboxChange("Leave ~2 months of living expenses in your checking account and move the rest to savings")}
                  />
                  <label htmlFor="action4">Leave ~2 months of living expenses in your checking account and move the rest to savings</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module3;
