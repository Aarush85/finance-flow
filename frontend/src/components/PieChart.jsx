import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
// import { totalIncome, totalSaving } from "../data/SummarizeData";
import { useSummarizeData } from "../data/useSummarizeData";



ChartJS.register(Tooltip, Legend, ArcElement)

// console.log({ totalExpense, totalSaving, type1: typeof totalIncome, type2: typeof totalSaving });

export function PieChart() {
    const { totalIncome, totalExpense, totalSaving, loading } = useSummarizeData();


    const PieChartData = {
        labels: ["Expenses", "Savings"],
        datasets: [
            {
                label: "Amount",
                data: [totalExpense, totalSaving],
                backgroundColor: [
                    '#ef4444',
                    '#f59e0b'
                ],
                hoverOffset: 4
            }
        ]
    }

    const options = {};

    return <Pie options={options} data={PieChartData} />
}