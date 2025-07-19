import axios from "axios" 
import { useEffect } from "react";

let totalIncome = 0;
let totalExpense = 0;

export function SummarizeData(){

useEffect(() =>{

const CalculateIncome =  async() => {
    const response = await axios.get("http://localhost:3000/api/income/getAll", 
        {
            headers: {
                Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
            }
        }
    )

    const incomes = response.data.IncomeObj;

    incomes.map((income) => {
        totalIncome += income.amount;
    })
}
CalculateIncome();


const calculateExpense = async () => {
    const response = await axios.get("http://localhost:3000/api/expense/getAll", {
        headers: {
            Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
        }
    })

    const expenses = response.data.ExpenseObj;

    expenses.map((expense) => {
        totalExpense += expense.amount;
    })
}

calculateExpense();

}, []
)

let totalSaving = totalIncome - totalExpense;


return {totalExpense, totalIncome, totalSaving}

}

module.exports = {totalExpense, totalIncome, totalSaving}
