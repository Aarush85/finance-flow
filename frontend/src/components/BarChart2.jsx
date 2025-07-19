import { useSummarizeData } from "../data/useSummarizeData";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart2() {
  const { travel, groceries, rent, restaurant, coffee, streaming } = useSummarizeData();

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
      hover: {
    mode: 'nearest',   // or 'index', 'dataset', 'point'
    intersect: true     // highlight only if hovered exactly on a bar
  },
    scales: {
      y: {
        beginAtZero: true,
        max: 15000,
        ticks: {
          stepSize: 2000,
          maxTicksLimit: 5,
          callback: function (value) {
            const num = typeof value === "string" ? parseFloat(value) : value;
            return num >= 1000 ? `${num / 1000}k` : num.toString();
          },
          padding: 8,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
        },
        grid: {
          drawBorder: false,
          color: '#e0e0e0',
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const BarData = {
    labels: ["travel", "groceries", "rent", "restaurant", "coffee", "streaming"],
    datasets: [
      {
        label: 'Amount',
        data: [travel, groceries, rent, restaurant, coffee, streaming],
        // backgroundColor: 'rgba(54, 162, 235, 0.2)', // soft blue, feel free to tweak
        // backgroundColor: 'rgba(34, 197, 94, 0.4)', // Tailwind's green-500 with transparency
backgroundColor: 'rgba(22, 163, 74, 0.6)' ,// Tailwind `green-600`


        // backgroundColor: [
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(255, 205, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(201, 203, 207, 0.2)'
        // ],
        // borderColor: [
        //   'rgb(255, 159, 64)',
        //   'rgb(255, 205, 86)',
        //   'rgb(75, 192, 192)',
        //   'rgb(54, 162, 235)',
        //   'rgb(153, 102, 255)',
        //   'rgb(201, 203, 207)'
        // ],
        // borderWidth: 5,
        minBarLength: 15,
        barThickness: 50
      },
    ],
  };

  return <Bar options={options} data={BarData} height={300} width={500}/>;
}
