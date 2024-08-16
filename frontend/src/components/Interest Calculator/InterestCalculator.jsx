import React, { useState } from 'react';
import { Bar } from 'react-chartjs';
import './interestCalculator.css';

const CompoundInterestCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState('');
  const [annualContribution, setAnnualContribution] = useState('');
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('Annually');
  const [yearlyBalances, setYearlyBalances] = useState([]);
  const [message, setMessage] = useState('');

  const calculateCompoundInterest = (principal, annualContribution, rate, years, frequency) => {
    const frequencyMap = {
      Daily: 365,
      Monthly: 12,
      Annually: 1
    };

    const compoundingPeriods = frequencyMap[frequency];
    const interestRate = rate / 100;
    let futureValue = principal;
    let balances = [];

    for (let i = 0; i < years; i++) {
      futureValue += annualContribution;
      futureValue *= (1 + interestRate / compoundingPeriods) ** compoundingPeriods;
      balances.push(futureValue.toFixed(2)); // Save the balance at the end of each year
    }

    return balances;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (retirementAge <= currentAge) {
      setMessage('Retirement age must be greater than current age.');
      return;
    }

    const years = retirementAge - currentAge;
    const balances = calculateCompoundInterest(
      parseFloat(initialDeposit),
      parseFloat(annualContribution),
      parseFloat(rateOfReturn),
      years,
      compoundFrequency
    );

    setYearlyBalances(balances);
    setMessage('');
  };

  // Data for chart
  const chartData = {
    labels: yearlyBalances.map((_, index) => `Year ${index + 1}`),
    datasets: [
      {
        label: 'Total Balance',
        data: yearlyBalances,
        backgroundColor: '#031926', // Bar color
        hoverBackgroundColor: '#02161b' // Hover color
      }
    ]
  };

  return (
    <div className="section compounding-interest-calculator">
      <div className="section-title">Compounding Interest Calculator</div>
      <div className="section-content">
        <div className="input-group">
          <label>
            Initial Deposit:   
            <input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Annual Contribution:   
            <input
              type="number"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Current Age:   
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Expected Retirement Age:   
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Estimated Rate of Return (%):   
            <input
              type="number"
              value={rateOfReturn}
              onChange={(e) => setRateOfReturn(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div className="input-group">
          <label>Compound Frequency:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Daily"
                checked={compoundFrequency === 'Daily'}
                onChange={(e) => setCompoundFrequency(e.target.value)}
              />
              Daily
            </label>
            <label>
              <input
                type="radio"
                value="Monthly"
                checked={compoundFrequency === 'Monthly'}
                onChange={(e) => setCompoundFrequency(e.target.value)}
              />
              Monthly
            </label>
            <label>
              <input
                type="radio"
                value="Annually"
                checked={compoundFrequency === 'Annually'}
                onChange={(e) => setCompoundFrequency(e.target.value)}
              />
              Annually
            </label>
          </div>
        </div>

        <button onClick={handleSubmit}>Calculate</button>
        {message && <p className="error-message">{message}</p>}

        {/* Render the chart */}
        {yearlyBalances.length > 0 && (
          <div className="result">
            <h3>Future Balance Over Time</h3>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;