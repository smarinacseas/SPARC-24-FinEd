import React, { useState, useEffect, useContext } from 'react';
import './Module5.css';
import api from '../../../api';
import { useAuth } from '../../../context/AuthContext'; 

function Module5() {
  const { isAuthenticated, userEmail } = useAuth();

  const [checkedItems, setCheckedItems] = useState({
    hsa: false,
    compareFunds: false,
    rothIRA: false,
    homeOwnership: false,
    research: false,
  });


  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('module5CheckedItems');
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
      localStorage.setItem('module5CheckedItems', JSON.stringify(updatedCheckedItems)); // Save to local storage
      return updatedCheckedItems;
    });
  };

  const updateProgress = async (updatedActions, progress) => {
    if (userEmail) {
      try {
        const response = await api.post('/update-progress', {
          email: userEmail,
          module: 'module5',
          progress: progress,
        });
        console.log('Progress update response:', response);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    } else {
      console.error('User email is not available');
    }
  };


  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 5</h1>
        <h2>Investing Simplified</h2>
        <div className="content-grid">

          {/* Power of Smart Investing Section */}
          <div className="section motivating-example scrollable-section" style={{ maxHeight: '600px' }}>
            <div className="section-title">The Power of Smart Investing: An Overview</div>
            <div className="section-content">
              <ul>
                <li>
                  Investing is often portrayed as a complex game reserved for experts, but the truth is that anyone can achieve financial success with the right approach. Whether you’re investing in the stock market, real estate, or retirement accounts, understanding the basics can help you make informed decisions and build wealth over time.
                </li>
              </ul>

              <h3>Example: The Impact of Consistent, Passive Investing</h3>
              <ul>
                <li>
                  <b>Meet Jane:</b> Jane is 25 years old and just started her first job. She decides to invest $300 per month in an S&P 500 index fund, which has historically returned an average of 7% per year. Jane doesn't actively manage her investments; instead, she lets her money grow passively.
                </li>
                <li>
                  <b>Fast Forward 40 Years:</b> By the time Jane is 65, her consistent contributions and the power of compound interest have grown her investment to over $730,000. This is without making any complex financial moves—just steady, passive investing.
                </li>
              </ul>

              <h3>Surprising Facts to Consider:</h3>
              <ul>
                <li>
                  <b>Actively Managed Funds vs. Index Funds:</b> Did you know that over 80% of actively managed funds fail to outperform the S&P 500 over the long term? Despite higher fees and the promise of expert management, most active funds fall short, which is why more and more investors are turning to low-cost index funds.
                </li>
                <li>
                  <b>The Power of Low-Cost Investing:</b> A difference of just 1% in annual fees can cost you hundreds of thousands of dollars over a lifetime of investing. For example, if Jane's fund had a 1% fee instead of 0.1%, she would have ended up with nearly $200,000 less by retirement.
                </li>
                <li>
                  <b>Roth IRA vs. Traditional IRA:</b> Many young investors are unaware that a Roth IRA can be a more powerful tool for retirement than a traditional IRA, especially if they expect to be in a higher tax bracket in the future. A Roth IRA allows for tax-free withdrawals, providing flexibility and security in retirement.
                </li>
                <li>
                  <b>Homeownership and Equity:</b> Homeownership is often seen as a cornerstone of the American Dream, but did you know that the average homeowner has a net worth 40 times greater than that of a renter? Building equity through homeownership can be a powerful way to grow wealth, particularly when combined with smart investment strategies.
                </li>
              </ul>

              <h3>Key Takeaways:</h3>
              <ul>
                <li>
                  <b>Start Early, Stay Consistent:</b> Whether you’re investing in the stock market, real estate, or retirement accounts, the earlier you start and the more consistent you are, the more you can take advantage of compound interest and long-term growth.
                </li>
                <li>
                  <b>Keep Costs Low:</b> High fees can erode your returns over time. Stick to low-cost index funds and be mindful of the fees associated with any investment.
                </li>
                <li>
                  <b>Understand Your Retirement Options:</b> Knowing the differences between Roth IRAs and traditional IRAs can help you make better decisions for your future. Consider your current and future tax situation when deciding which to contribute to.
                </li>
                <li>
                  <b>Build Equity Through Homeownership:</b> While renting may seem more flexible, homeownership offers the potential to build significant equity over time, contributing to your overall wealth.
                </li>
              </ul>
            </div>
          </div>

          {/* Investing Explained Section */}
          <div className="section info scrollable-section" style={{ maxHeight: '280px' }}>
            <div className="section-title">Investing Explained</div>
            <div className="section-content">
              <ul>
                <li><b>Passively Investing in the S&P500:</b></li>
                <ul>
                  <li><b>Diversification:</b> The S&P 500 includes companies across all sectors, providing broad market exposure.</li>
                  <li><b>Historical Performance:</b> Over the long term, the S&P 500 has historically returned an average of about 7-10% per year, after inflation.</li>
                  <li><b>Low Costs:</b> Index funds and ETFs typically have low expense ratios, meaning more of your money stays invested.</li>
                  <li><b>Simplicity:</b> This is a set-it-and-forget-it approach that doesn't require constant monitoring or market timing.</li>
                </ul>

                <li><b>Active Management vs. Passive Investing:</b></li>
                <ul>
                  <li><b>Performance:</b> According to SPIVA (S&P Indices Versus Active), over 80% of active fund managers underperform the S&P 500 over a 10-year period.</li>
                  <li><b>Costs:</b> Actively managed funds often have higher fees due to the cost of professional management, which eats into returns. In contrast, index funds have minimal fees.</li>
                  <li><b>Consistency:</b> Even the best-performing active funds in one period rarely maintain their top position in subsequent periods, making it difficult for investors to consistently pick winning funds.</li>
                </ul>

                <li><b>Strategizing Between Roth vs. Standard IRAs:</b></li>
                <ul>
                  <li><b>Roth IRA:</b>
                    <ul>
                      <li>Contributions are made with after-tax dollars, but withdrawals in retirement are tax-free.</li>
                      <li>Ideal if you expect to be in a higher tax bracket in retirement or want to maximize tax-free income.</li>
                      <li>There are income limits for contributing to a Roth IRA.</li>
                    </ul>
                  </li>
                  <li><b>Traditional IRA:</b>
                    <ul>
                      <li>Contributions may be tax-deductible, providing a tax break in the year you contribute.</li>
                      <li>Withdrawals in retirement are taxed as ordinary income.</li>
                      <li>Better if you expect to be in a lower tax bracket in retirement or if you want a tax deduction now.</li>
                    </ul>
                  </li>
                  <li><b>Strategy:</b>
                    <ul>
                      <li><b>Young Investors:</b> May benefit more from a Roth IRA due to their longer time horizon and the likelihood of higher earnings in the future.</li>
                      <li><b>Older Investors:</b> May prefer the immediate tax deduction of a traditional IRA, especially if they’re in a higher tax bracket now and expect to be in a lower one in retirement.</li>
                    </ul>
                  </li>
                </ul>

                <li><b>Homeownership/Real Estate and Equity - A Simple Example:</b></li>
                <ul>
                  <li><b>Equity:</b> The portion of your home that you own outright, calculated as the current market value minus any mortgage balance. As you pay down your mortgage and/or your home’s value increases, your equity grows.</li>
                  <li><b>Example:</b> 
                    <ul>
                      <li><b>Purchase:</b> You buy a home for $300,000 with a $60,000 down payment and a $240,000 mortgage.</li>
                      <li><b>Year 1:</b> After one year, you've paid down your mortgage to $235,000, and the home value has appreciated to $310,000.</li>
                      <li><b>Equity:</b> Your equity is now $310,000 (home value) - $235,000 (mortgage) = $75,000.</li>
                      <li><b>Wealth Building:</b> As you continue to pay down your mortgage and your home's value increases, your equity grows, contributing to your overall net worth.</li>
                    </ul>
                  </li>
                </ul>
              </ul>
            </div>
          </div>

          {/* Actions Section */}
          <div className="section actions scrollable-section" style={{ maxHeight: '300px' }}>
            <div className="section-title">Actions</div>
            <div className="section-content">

              <div>
                <label style={{ opacity: checkedItems.compareFunds ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.compareFunds}
                    onChange={() => handleCheckboxChange('compareFunds')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Compare Fees and Performance of Your Current Investments.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.compareFunds ? 0.5 : 1 }}>
                  Review the fees associated with any actively managed funds you own and consider switching to lower-cost index funds if the performance doesn't justify the higher fees.
                </p>
              </div>

              <div>
                <label style={{ opacity: checkedItems.rothIRA? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.rothIRA}
                    onChange={() => handleCheckboxChange('rothIRA')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Open or Contribute to a Roth IRA.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.rothIRA ? 0.5 : 1 }}>
                  If you’re eligible, start contributing to a Roth IRA. This account type allows your investments to grow tax-free, and you can withdraw funds tax-free in retirement.
                </p>
              </div>

              <div>
                <label style={{ opacity: checkedItems.hsa? 0.5 : 1 }}>
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
                <label style={{ opacity: checkedItems.homeOwnership ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.homeOwnership }
                    onChange={() => handleCheckboxChange('homeOwnership')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Explore Homeownership Opportunities.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.homeOwnership ? 0.5 : 1 }}>
                  If you’re currently renting, start exploring the possibility of buying a home. Building equity through homeownership can be a powerful way to increase your net worth over time.
                </p>
              </div>

              <div>
                <label style={{ opacity: checkedItems.research ? 0.5 : 1 }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.research }
                    onChange={() => handleCheckboxChange('research')}
                  />
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Research the Differences Between Roth and Traditional IRAs.</span>
                </label>
                <p style={{ marginTop: '5px', opacity: checkedItems.homeOwnership ? 0.5 : 1 }}>
                Use an online calculator to compare the benefits of contributing to a Roth IRA versus a traditional IRA, based on your current tax bracket and expected retirement tax bracket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module5;