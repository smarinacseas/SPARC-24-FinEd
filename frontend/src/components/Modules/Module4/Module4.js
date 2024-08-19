import React, { useState, useEffect, useContext } from 'react';
import '../AllModules.css';
import './Module4.css';
import api from '../../../api';
import InterestCalculator from '../../Interest Calculator/InterestCalculator';
import { useAuth } from '../../../context/AuthContext';


function Module4() {
  const { isAuthenticated, userEmail } = useAuth();
  const [checkedItems, setCheckedItems] = useState({
    currentAccounts: false,
    roth: false,
    hsa: false,
    brokerage: false,
    assets: false
  });
  // AI added
  const [checkAI, setAI] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');
  const [typeAdvice, setTypeAdvice] = useState('');

  useEffect(() => {
    // Initialize component
    const initialize = async () => {
      try {
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
      setTypeAdvice("mod4_advice"); // Set the advice type based on your logic
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

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('module4CheckedItems');
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
  }, []);

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

      updateProgress(updatedCheckedItems, progress); // Update progress and state
      localStorage.setItem('module4CheckedItems', JSON.stringify(updatedCheckedItems)); // Save to local storage
      return updatedCheckedItems;
    });
  };

  const updateProgress = async (updatedActions, progress) => {
    if (userEmail) {
      try {
        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module4',
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
        <h1>Module 4</h1>
        <h2>Retirement and Brokerage Accounts</h2>
          <div className="section video-section">
            <div className="section-title">Watch This Video: Average 401(k) Balance by Age (2024 Edition)</div>
            <div className="video-container">
            <iframe width="800" height="450" src="https://www.youtube.com/embed/25NLw6vhpw8?si=2AhBgwwOEDd3kRre" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        <div className="content-grid-module4">

          {/* Power of Compounding Interest Section */}
          <div className="section motivating-example scrollable-section" style={{ maxHeight: '600px' }}>
            <div className="section-title">The Power of Compounding Interest</div>
            <div className="section-content">
              <ul>
                <li>Compounding interest is the process where the interest you earn on your investment earns interest on itself over time. The earlier you start investing, the more time your money has to grow.</li>
              </ul>

              <h3>Example: Sarah vs. John</h3>
              <ul>
                <li><b>Sarah Starts Early:</b></li>
                <ul>
                  <li>Sarah begins investing at age 25, contributing $200 a month into an investment account with an average annual return of 7%.</li>
                  <li>By the time Sarah reaches 65, her total contribution is $96,000. However, with compounding interest, her investment grows to nearly $525,000.</li>
                </ul>
                <li><b>John Starts Late:</b></li>
                <ul>
                  <li>John, on the other hand, waits until he is 35 to start investing. He contributes $400 a month, doubling Sarah’s contribution, with the same 7% average annual return.</li>
                  <li>By the time John reaches 65, his total contribution is $144,000. Despite contributing more, his investment grows to just over $470,000 due to the shorter compounding period.</li>
                </ul>
              </ul>

              <h3>Key Takeaways:</h3>
              <ul>
                <li><b>Time is your biggest asset:</b> The earlier you start, the more time your money has to compound and grow, even if your contributions are smaller.</li>
                <li><b>Consistency pays off:</b> Regular, consistent contributions, no matter how small, can lead to significant growth over time.</li>
                <li><b>Waiting has a cost:</b> Delaying your investments means you need to contribute significantly more to catch up, and you may still end up with less than if you had started earlier.</li>
              </ul>
            </div>
          </div>

          {/* Retirement and Investment Accounts Section */}
          <div className="section info scrollable-section" style={{ maxHeight: '600px' }}>
            <div className="section-title">Retirement and Investment Accounts</div>
            <div className="section-content">
              <ul>
                <li><b>Roth IRA:</b></li>
                <ul>
                  <li><b>Tax Advantages:</b> Contributions are made with after-tax dollars, but withdrawals in retirement are tax-free, including earnings. This makes a Roth IRA a powerful tool for tax-free income in retirement.</li>
                  <li><b>Contribution Limits:</b> For 2024, you can contribute up to $7,000 per year if you’re under 50, and $8,000 if you’re 50 or older (catch-up contribution). Income limits apply, and the contribution limit may be reduced if your modified adjusted gross income (MAGI) exceeds certain thresholds.</li>
                  <li><b>Strategies:</b> Start contributing as early as possible to maximize tax-free growth. A Roth IRA is particularly advantageous if you expect to be in a higher tax bracket in retirement.</li>
                  <li><b>Cautions:</b> There are income limits for contributing to a Roth IRA. Also, since contributions are made with after-tax dollars, you don't get a tax deduction in the year you contribute.</li>
                </ul>

                <li><b>401(k):</b></li>
                <ul>
                  <li><b>Tax Advantages:</b> Contributions are made with pre-tax dollars, reducing your taxable income in the year of contribution. Earnings grow tax-deferred, meaning you don’t pay taxes on them until you withdraw the money in retirement.</li>
                  <li><b>Contribution Limits:</b> The 401(k) contribution limit for 2024 is $23,000 for employee contributions and $69,000 for combined employee and employer contributions. If you're age 50 or older, you're eligible for an additional $7,500 in catch-up contributions, raising your employee contribution limit to $30,000.</li>
                  <li><b>Strategies:</b> Contribute enough to get your employer’s full match if offered—this is essentially free money. Consider increasing contributions each year, especially if your salary increases.</li>
                  <li><b>Cautions:</b> Early withdrawals before age 59½ may incur a 10% penalty plus taxes. Required minimum distributions (RMDs) start at age 72, meaning you must start taking money out, even if you don't need it, and pay taxes on those withdrawals.</li>
                </ul>

                <li><b>Health Savings Account (HSA):</b></li>
                <ul>
                  <li><b>Tax Advantages:</b> Contributions are tax-deductible, earnings grow tax-free, and withdrawals for qualified medical expenses are tax-free. After age 65, you can withdraw funds for non-medical expenses without penalty, though you’ll pay taxes like a traditional IRA.</li>
                  <li><b>Contribution Limits:</b> For 2024, the contribution limit is $4,150 for individual coverage and $8,300 for family coverage. If you’re 55 or older, you can contribute an additional $1,000 as a catch-up contribution.</li>
                  <li><b>Strategies:</b> Maximize contributions if you’re enrolled in a high-deductible health plan. Use HSA funds for current medical expenses, or let the account grow for tax-free medical expenses in retirement.</li>
                  <li><b>Cautions:</b> Non-medical withdrawals before age 65 incur a 20% penalty plus taxes. Make sure to keep receipts for all qualified medical expenses if you plan to use HSA funds tax-free.</li>
                </ul>

                <li><b>Self-Managed Brokerage Accounts:</b></li>
                <ul>
                  <li><b>Tax Advantages:</b> No tax advantages like a Roth IRA or 401(k), but gains from investments held longer than one year are taxed at lower long-term capital gains rates. Dividends may also be taxed at favorable rates.</li>
                  <li><b>Contribution Limits:</b> There are no contribution limits for brokerage accounts. However, you need to be mindful of the annual tax implications of your investments, as these accounts do not offer tax-deferred growth.</li>
                  <li><b>Strategies:</b> Use a brokerage account for flexibility and access to a wide range of investments, including stocks, bonds, and ETFs. Consider tax-loss harvesting to offset gains with losses and reduce taxable income.</li>
                  <li><b>Cautions:</b> Investment gains are taxable, and there's no tax deferral. Be mindful of high turnover or frequent trades, which can increase your tax liability. Also, there’s no penalty-free way to withdraw funds, unlike a 401(k) or Roth IRA with qualified withdrawals.</li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="section interest-calc">
    <InterestCalculator />
    </div>
          {/* Actions Section */}
          <div className="section actions_m4" >
            <div className="section-title">Actions</div>
            <div className="section-content">

              <div>
                <label style={{ opacity: checkedItems.currentAccounts ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.currentAccounts}
                    onChange={() => handleCheckboxChange('currentAccounts')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Review your current retirement account contributions.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.currentAccounts ? 0.5 : 1 }}>
                  Make sure you are contributing enough to get the full employer match in your 401(k) if applicable.
                </p>
              </div>

              <div>
                <label style={{ opacity: checkedItems.roth ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.roth}
                    onChange={() => handleCheckboxChange('roth')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Open or contribute to a Roth IRA if eligible.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.roth ? 0.5 : 1 }}>
                  This is a great way to build tax-free income in retirement.
                </p>
              </div>

              <div>
                <label style={{ opacity: checkedItems.hsa ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.hsa}
                    onChange={() => handleCheckboxChange('hsa')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Increase your HSA contributions to maximize tax benefits.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.hsa ? 0.5 : 1 }}>
                  Especially if you have a high-deductible health plan, this can be a smart move.
                </p>
              </div>

              <div>
                <label style={{ opacity: checkedItems.brokerage ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.brokerage}
                    onChange={() => handleCheckboxChange('brokerage')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Consider opening a self-managed brokerage account.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.brokerage ? 0.5 : 1 }}>
                  This provides additional investment flexibility and potential long-term gains.
                </p>
              </div>

              <div>
                <label style={{ opacity: checkedItems.assets ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.assets}
                    onChange={() => handleCheckboxChange('assets')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Check your 401(k) or IRA asset allocation.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.assets ? 0.5 : 1 }}>
                  Ensure it aligns with your retirement goals and risk tolerance.
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
            <p><strong>What is the best way to allocate my assets between retirement and investment accounts?</strong></p>
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
</div>);
}

export default Module4;