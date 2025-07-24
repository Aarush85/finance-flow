import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const incomeData = [5000, 4000, 4500, 3000, 1000, 9500, 6000, 4000, 9000, 5500, 4800, 6000];
const expenseData = [1000, 1500, 1700, 1800, 800, 1200, 3000, 2000, 2500, 3100, 2900, 2300];

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: incomeData,
      backgroundColor: '#195d54',
      borderRadius: 15,
      barThickness: 32,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (ctx) {
          const index = ctx.dataIndex;
          return [
            `Income: $${incomeData[index].toLocaleString()}`,
            `Expense: $${expenseData[index].toLocaleString()}`
          ];
        },
      },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
  animation: false,
};

// Custom plugin: draw expense bar from y=0 up to expense value
const fillPlugin = {
  id: 'expenseFill',
  afterDatasetsDraw(chart) {
    const {
      ctx,
      chartArea: { top, bottom },
      scales: { x, y },
    } = chart;

    incomeData.forEach((income, i) => {
      const expense = expenseData[i];
      const barX = x.getPixelForValue(i);
      const barWidth = 32;
      const barLeft = barX - barWidth / 2;

      const expenseTopY = y.getPixelForValue(expense); // top of expense bar
      const baseY = y.getPixelForValue(0); // bottom baseline

      const height = baseY - expenseTopY;

      // Draw light green expense from bottom
      ctx.fillStyle = '#b3e441';
      ctx.beginPath();
      ctx.roundRect(barLeft, expenseTopY, barWidth, height, 8);
      ctx.fill();
    });
  },
};

export default function BarChart() {
  return <Bar data={data} options={options} plugins={[fillPlugin]} />;
}
