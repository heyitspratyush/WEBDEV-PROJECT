import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CalorieChart = ({ caloriesNeeded, caloriesConsumed, caloriesBurned, targetCalories }) => {
  const data = {
    labels: ['Base Needed', 'Consumed', 'Burned', 'Target'],
    datasets: [
      {
        label: 'Calories (kcal)',
        data: [
          caloriesNeeded || 0,
          caloriesConsumed || 0,
          caloriesBurned || 0,
          targetCalories || 0
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Calorie Overview',
        font: {
          size: 16,
          family: "'Inter', sans-serif"
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container card">
      <div style={{ height: '300px', width: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CalorieChart;
