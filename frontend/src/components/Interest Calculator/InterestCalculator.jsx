import React, { useState } from 'react';
import { Line } from 'react-chartjs';
import './interestCalculator.css';

const InterestCalculator = () => {
    const [initialInvestment, setInitialInvestment] = useState('');
    const [annualReturn, setAnnualReturn] = useState('');
    const [annualContribution, setAnnualContribution] = useState('');
    const [years, setYears] = useState('');
    const [frequency, setFrequency] = useState('annually');
    const [result, setResult] = useState(null);
    const [graphData, setGraphData] = useState(null);
  
    const calculate = (e) => {
      e.preventDefault();
      // Calculation logic for compound interest
      const rate = parseFloat(annualReturn) / 100;
      const periods = frequency === 'annually' ? 1 : frequency === 'monthly' ? 12 : 365;
      const totalPeriods = periods * parseInt(years);
      let futureValue = parseFloat(initialInvestment);
      let contributions = parseFloat(annualContribution) / periods;
      let dataPoints = [];
      
      for (let i = 1; i <= totalPeriods; i++) {
        futureValue = futureValue * (1 + rate / periods) + contributions;
        if (i % periods === 0) {
          dataPoints.push({ x: i / periods, y: futureValue.toFixed(2) });
        }
      }
      
      setResult(futureValue.toFixed(2));
      setGraphData({
        labels: dataPoints.map(point => point.x),
        datasets: [
          {
            label: 'Future Balance',
            data: dataPoints.map(point => point.y),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          },
        ],
      });
    };
  
    return (
      <div className="calculator-container">
        <h1 className="calculator-title">Compound Interest Calculator</h1>
        <form className="calculator-form" onSubmit={calculate}>
          <div className="form-group">
            <label>Initial Deposit</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Contributions</label>
            <input
              type="number"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(e.target.value)}
            />
            <div>
              <label>
                <input
                  type="radio"
                  value="daily"
                  checked={frequency === 'daily'}
                  onChange={() => setFrequency('daily')}
                />
                Daily
              </label>
              <label>
                <input
                  type="radio"
                  value="monthly"
                  checked={frequency === 'monthly'}
                  onChange={() => setFrequency('monthly')}
                />
                Monthly
              </label>
              <label>
                <input
                  type="radio"
                  value="annually"
                  checked={frequency === 'annually'}
                  onChange={() => setFrequency('annually')}
                />
                Annually
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Investment Time Span</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Estimated Rate of Return (%)</label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>
        {result && (
          <div className="calculator-result">
            <h2>Future Balance</h2>
            <p>${result}</p>
          </div>
        )}
        {graphData && (
          <div className="calculator-graph">
            <Line data={graphData} />
          </div>
        )}
      </div>
    );
  };
  
  export default InterestCalculator;