import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
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
  const [calculatedBalance, setCalculatedBalance] = useState('');

  const handleReset = () => {
    setInitialDeposit('');
    setAnnualContribution('');
    setCurrentAge('');
    setRetirementAge('');
    setRateOfReturn('');
    setCompoundFrequency('Annually'); // Set to default value
    setYearlyBalances([]);
    setMessage('');
    setCalculatedBalance('');
  };

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
    setCalculatedBalance(balances[balances.length - 1]);
    setMessage('');
  };

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Data for chart
  const chartData = {
    labels: yearlyBalances.map((_, index) => currentYear + index),
    datasets: [
      {
        label: 'Total Balance',
        data: yearlyBalances,
        backgroundColor: '#031926', // Bar color
        hoverBackgroundColor: '#02161b', // Hover color
        barThickness: 30, // Adjust bar thickness for wider bars
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
          callback: function(value, index) {
            return index % 5 === 0 ? this.getLabelForValue(value) : '';
          },
          color: '#8c8c8c',
        },
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          },
          color: '#8c8c8c',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        callbacks: {
          label: function(tooltipItem) {
            return '$' + tooltipItem.raw.toLocaleString();
          }
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#031926',
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
  
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(0, 123, 255, 0.8)'); // Top color (darker)
          gradient.addColorStop(1, 'rgba(0, 123, 255, 0.2)'); // Bottom color (lighter)
          return gradient;
        },
        hoverBackgroundColor: '#031926', // Darker color on hover
      }
    }
  };

  return (
    <div className="section compounding-interest-calculator">
      <div className="section-title">Compounding Interest Calculator</div>
      <div className="section-content">
        <div className="input-group">
          <label>
            Starting Balance ($):   
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
            Annual Contribution ($):   
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

        <button className="btn" onClick={handleSubmit}>Calculate</button>
        <button className="btn" onClick={handleReset}>Reset</button>
        {message && <p className="error-message">{message}</p>}

        {/* Render the chart */}
        {yearlyBalances.length > 0 && (
          <div className="result">
            <h3>Future Balance Over Time: ${parseFloat(calculatedBalance).toLocaleString()}</h3>
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;