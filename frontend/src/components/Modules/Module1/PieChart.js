import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import './PieChart.css';

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const data = {
    labels: [
      "Payment History",
      "Amounts Owed",
      "Length of History",
      "New Credit",
      "Types of Credit"
    ],
    datasets: [
      {
        data: [35, 30, 15, 10, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverOffset: 10,
      },
    ],
  };

  const descriptions = [
    "Your history of paying bills on time. Late or missed payments can significantly lower your score, so it's crucial to stay current with all your payments.",
    "The total amount of debt you have compared to your credit limits. A high credit utilization rate (using a large percentage of your available credit) can negatively impact your score.",
    "The average age of your credit accounts. A longer history of credit use demonstrates stability, which can positively influence your score.",
    "The impact of recently opened accounts. Opening several new accounts in a short period can make you appear riskier to lenders, so it's best to space out new credit applications.",
    "The variety of credit types you have, such as credit cards, mortgages, and auto loans. A mix of credit types can show that you can handle different types of debt responsibly."
  ];

  const options = {
    plugins: {
      tooltip: {
        enabled: false, // Disable default tooltips
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        const index = chartElement[0].index;
        setHoveredSegment({
          percentage: data.datasets[0].data[index],
          label: data.labels[index],
          description: descriptions[index],
        });
      } else {
        setHoveredSegment(null);
      }
    },
  };

  return (
<div className="pie-chart-container">
  <div className="pie-chart">
    <Pie data={data} options={options} />
  </div>
  {hoveredSegment && (
    <div className="hover-info">
      <h4>{hoveredSegment.label} ({hoveredSegment.percentage}%)</h4>
      <p>{hoveredSegment.description}</p>
    </div>
  )}
</div>
  );
};

export default PieChart;