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
)

export function BarChart() {

    const { travel, groceries, rent, restaurant, coffee, streaming } = useSummarizeData();

    const options = {};
    const BarData = {
        labels: ["travel", "groceries", "rent", "restaurant", "coffee", "streaming"],
        datasets: [{
            label: 'Amount',
            data: [travel, groceries, rent, restaurant, coffee, streaming],
            backgroundColor: [
                 'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 5,
            minBarLength: 15
        }]
    };


    return <Bar options={options} data={BarData} />
}