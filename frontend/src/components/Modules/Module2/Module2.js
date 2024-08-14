// import React, { useState } from 'react';
// // import React from 'react';
// import './Module2.css';

// function Module2() {
//    // State hooks for the debt calculator
//    const [balanceOwed, setBalanceOwed] = useState('');
//    const [interestRate, setInterestRate] = useState('');
//    const [monthlyPayment, setMonthlyPayment] = useState('');
//    const [monthsToPayOff, setMonthsToPayOff] = useState('');
//    const [estimatedPayment, setEstimatedPayment] = useState(null);



//   return (
//     <div className="module-container">
//       <div className="main-content">
//         <h1>Module 2</h1>
//         <h2>Debt Management</h2>
//         <div className="content-grid">
//           <div className="section motivating-example">
//             <div className="section-title">Emily's Debt Management Success</div>
//             <div className="section-content">
//               <h5>The Situation:</h5>
//                 <ul>
//                   <li><strong>Debt:</strong> $7,500 credit card debt (20% interest) and $5,000 personal loan (15% interest).</li>
//                   <li><strong>Challenge:</strong> Struggling with high interest and stress from debt.</li>
//                 </ul>
//                 <h5>The Plan:</h5>
//                 <ul>
//                   <li><strong>Budgeting:</strong> Allocated $500/month to debt repayment.</li>
//                   <li><strong>Consolidation:</strong>  Transferred $5,000 of credit card debt to a 0% APR balance transfer card.</li>
//                   <li><strong>Negotiation:</strong>  Secured lower interest rates on remaining debt.</li>
//                   <li><strong>Emergency Fund:</strong>   Started saving $500 for unexpected expenses.</li>
//                   <li><strong>Tracking:</strong>   Monitored progress and adjusted the budget as needed.</li>
//                 </ul>
//                 <h5>The Outcome:</h5>
//                 <ul>
//                   <li><strong>First 6 Months:</strong>  Paid off the transferred balance and reduced high-interest debt.</li>
//                   <li><strong>12 Months Later:</strong> Eliminated credit card debt and significantly reduced the personal loan.</li>
//                   <li><strong>Impact:</strong> Lower stress, better control of finances, started saving for retirement and building a larger emergency fund.</li>
//                 </ul>
//                 <h5>Takeaway:</h5> With a clear plan and dedication, Emily successfully managed and reduced her debt, leading to improved financial health and peace of mind.
//             </div>
//           </div>
//           <div className="section info">
//             <div className="section-title">Info: </div>
//             <div className="section-content">
//             Debt management involves strategies and practices designed to handle and reduce personal debt effectively. It focuses on organizing, paying off, and ultimately eliminating debts to achieve financial stability and improve overall financial health.
//             </div>
//           </div>
//           <div className="section actions">
//             <div className="section-title">Actions</div>
//             <div className="section-content">
//                 <ul>
//                   <li><strong>Assess Financial Situation and establish clear goals:</strong>  Gather financial statements to collect statements for all debts, income sources, and expenses. Set specific targets for how much debt you want to pay off and by when.</li>
//                   <li><strong>Develop a budget:</strong> Create a Budget Plan to allocate funds for essential expenses, debt repayment, and savings. Adjust as necessary to meet debt reduction goals.</li>
//                   <li><strong>Consolidate Debts:</strong>  Look into consolidating high-interest debts into a lower-interest loan or credit card. Focus on paying off debts with the highest interest rates first to minimize overall interest costs.</li>
//                   <li><strong>Build and Maintain an Emergency Fund</strong> Aim to save 3-6 months' worth of living expenses to avoid accumulating new debt when unexpected costs arise. Keep emergency funds separate from daily spending to prevent temptation.</li>
//                   <li><strong>Educate and Monitor:</strong>  Stay informed about personal finance topics and debt management strategies.  Monitor progress, adjust strategies as needed, and celebrate milestones achieved.</li>
//                 </ul>
//             </div>
//           </div>
//           {/* add here */}
//           <div className="repayment">
//             <div><h3>Debt Repayment Calculator</h3></div>
//             <div>
//             <p>See how long it could take to pay off your credit card debt.</p>
//             <p>Let's start with your details.</p>
//             </div>
//             <label htmlFor="balanceOwed">Balance Owed ($):</label>
//               <input
//                 id="balanceOwed"
//                 type="number"
//                 value={balanceOwed}
//                 onChange={(e) => setBalanceOwed(e.target.value)}
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="interestRate">Estimated Interest Rate (%):</label>
//               <input
//                 id="interestRate"
//                 type="number"
//                 step="0.01"
//                 value={interestRate}
//                 onChange={(e) => setInterestRate(e.target.value)}
//               />
//             </div>
//           <div className="section-content">Debt Outcome</div>

//           </div>
//         </div>
//       </div>

//   );
// }

// export default Module2;


import React, { useState } from 'react';
import './Module2.css';

function Module2() {
  // State hooks for the debt calculator
  const [balanceOwed, setBalanceOwed] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthsToPayOff, setMonthsToPayOff] = useState('');
  // Desired months to pay off
  const [desiredMonthsToPayOff, setDesireMonthsToPayOff] = useState('');
  const [monthlyDesiredPayment, setMonthlyDesiredPayment] = useState(null);
  const [totalDesiredPayment, setTotalDesirePayment] = useState(null);

  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  // Comparision Logic
  const [compMesssage, setCompMessage] = useState(null);

  // Calculate function
  const handleCalculate = () => {
    if (balanceOwed && interestRate && monthsToPayOff) {
      const principal = parseFloat(balanceOwed);
      const annualInterestRate = parseFloat(interestRate) / 100;
      const months = parseFloat(monthsToPayOff);
      
      // Expected Payment Calculation
      // Monthly interest rate
      const monthlyInterestRate = annualInterestRate / 12;
      
      // Calculate monthly payment
      const payment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months));
      
      // Calculate total payment
      const total = payment * months;

      setMonthlyPayment(payment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      setTotalPayment(total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

      // Desired Payment Calculation
      const desiredMonths = parseFloat(desiredMonthsToPayOff);
      // Calculate desired monthly payment
      const desiredPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -desiredMonths));
      // Calculate total desired payment
      const totalDesiredPayment = desiredPayment * desiredMonths;

      setMonthlyDesiredPayment(desiredPayment.toFixed(2));
      setTotalDesirePayment(totalDesiredPayment.toFixed(2));

      // Comparision Logic
      // If expected months to pay off is greater than desired months
      if (months >= desiredMonths){
        setCompMessage('Congratulations! You are on track to pay off your debt ' + (months - desiredMonths) + ' months sooner than your expected payoff period. \
          You will need to pay an additional $' + parseFloat(desiredPayment - payment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' per month compared to the expected monthly payment. \
          Overall, you will benefit from saving $' + parseFloat(total - totalDesiredPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' in total payments.');
      } else {
        setCompMessage('You will need ' + (desiredMonths - months) + ' additional month(s) to pay off your debt compared to your expected payoff period. \
           Your monthly payment will be $' +  parseFloat(payment - desiredPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' less than the monthly expected payment. Consequently, your overall payment will go up by $' + parseFloat(totalDesiredPayment - total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      }


    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleReset = () => {
    setBalanceOwed('');
    setInterestRate('');
    setMonthsToPayOff('');
    setDesireMonthsToPayOff('');
    setMonthlyPayment(null);
    setTotalPayment(null);
  };

  return (
    <div className="module-container">
      <div className="main-content">
        <h1>Module 2</h1>
        <h2>Debt Management</h2>
        <div className="content-grid">
          <div className="section motivating-example">
            <div className="section-title">Emily's Debt Management Success</div>
            <div className="section-content">
              <h5>The Situation:</h5>
                <ul>
                  <li><strong>Debt:</strong> $7,500 credit card debt (20% interest) and $5,000 personal loan (15% interest).</li>
                  <li><strong>Challenge:</strong> Struggling with high interest and stress from debt.</li>
                </ul>
                <h5>The Plan:</h5>
                <ul>
                  <li><strong>Budgeting:</strong> Allocated $500/month to debt repayment.</li>
                  <li><strong>Consolidation:</strong>  Transferred $5,000 of credit card debt to a 0% APR balance transfer card.</li>
                  <li><strong>Negotiation:</strong>  Secured lower interest rates on remaining debt.</li>
                  <li><strong>Emergency Fund:</strong>   Started saving $500 for unexpected expenses.</li>
                  <li><strong>Tracking:</strong>   Monitored progress and adjusted the budget as needed.</li>
                </ul>
                <h5>The Outcome:</h5>
                <ul>
                  <li><strong>First 6 Months:</strong>  Paid off the transferred balance and reduced high-interest debt.</li>
                  <li><strong>12 Months Later:</strong> Eliminated credit card debt and significantly reduced the personal loan.</li>
                  <li><strong>Impact:</strong> Lower stress, better control of finances, started saving for retirement and building a larger emergency fund.</li>
                </ul>
                <h5>Takeaway:</h5> With a clear plan and dedication, Emily successfully managed and reduced her debt, leading to improved financial health and peace of mind.
            </div>
          </div>
          <div className="section info">
            <div className="section-title">Info: </div>
            <div className="section-content">
            Debt management involves strategies and practices designed to handle and reduce personal debt effectively. It focuses on organizing, paying off, and ultimately eliminating debts to achieve financial stability and improve overall financial health.
            </div>
          </div>
          <div className="section actions">
            <div className="section-title">Actions</div>
            <div className="section-content">
                <ul>
                  <li><strong>Assess Financial Situation and establish clear goals:</strong>  Gather financial statements to collect statements for all debts, income sources, and expenses. Set specific targets for how much debt you want to pay off and by when.</li>
                  <li><strong>Develop a budget:</strong> Create a Budget Plan to allocate funds for essential expenses, debt repayment, and savings. Adjust as necessary to meet debt reduction goals.</li>
                  <li><strong>Consolidate Debts:</strong>  Look into consolidating high-interest debts into a lower-interest loan or credit card. Focus on paying off debts with the highest interest rates first to minimize overall interest costs.</li>
                  <li><strong>Build and Maintain an Emergency Fund</strong> Aim to save 3-6 months' worth of living expenses to avoid accumulating new debt when unexpected costs arise. Keep emergency funds separate from daily spending to prevent temptation.</li>
                  <li><strong>Educate and Monitor:</strong>  Stay informed about personal finance topics and debt management strategies.  Monitor progress, adjust strategies as needed, and celebrate milestones achieved.</li>
                </ul>
            </div>
          </div>
          <div className="section repayment">
            <h3>Debt Repayment Calculator</h3>
            <p>See how long it could take to pay off your credit card debt.</p>
            <p>Let's start with your details.</p>
            <div className="input-group">
              <label htmlFor="balanceOwed">Balance Owed ($):</label>
              <input
                id="balanceOwed"
                type="number"
                value={balanceOwed}
                onChange={(e) => setBalanceOwed(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="interestRate">Estimated Interest Rate (%):</label>
              <input
                id="interestRate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="monthsToPayOff">Expected Months to Pay Off:</label>
              <input
                id="monthsToPayOff"
                type="number"
                value={monthsToPayOff}
                onChange={(e) => setMonthsToPayOff(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="monthsToPayOff">Desired or Target Months to Pay Off:</label>
              <input
                id="monthsToPayOff"
                type="number"
                value={desiredMonthsToPayOff}
                onChange={(e) => setDesireMonthsToPayOff(e.target.value)}
              />
            </div>
            <button onClick={handleCalculate}>Estimate Your Payment</button>
            <button onClick={handleReset}>Start Over</button>
            {monthlyPayment !== null && totalPayment !== null && (
              <div className="result">
                <h4>Payment Details:</h4>
                
                

                <p><strong>Monthly Expected Payment:</strong> ${monthlyPayment}</p>
                <p><strong>Total Expected Payment:</strong> ${totalPayment}</p>
                <p><strong>Comparison:</strong> {compMesssage}</p>
              </div>
            )}
          </div>
          <div className="section debt-outcome">
            <h3>What is Debt Management?</h3>
            <p>Debt management involves strategies and practices designed to handle and reduce personal debt effectively. It focuses on organizing, paying off, and ultimately eliminating debts to achieve financial stability and improve overall financial health.</p>
            {/* Add specific content or additional information here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module2;