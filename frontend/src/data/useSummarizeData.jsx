import { useEffect, useState } from "react";
import axios from "axios";

export function useSummarizeData() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  const [travel, setTravel] = useState(0);
  const [groceries, setGroceries] = useState(0);
  const [rent, setRent] = useState(0);
  const [restaurant, setRestaurant] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [streaming, setStreaming] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg",
      };

      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get("http://localhost:3000/api/income/getAll", { headers }),
          axios.get("http://localhost:3000/api/expense/getAll", { headers }),
        ]);

        const incomeSum = incomeRes.data.IncomeObj.reduce((sum, inc) => sum + inc.amount, 0);
        const expenseSum = expenseRes.data.ExpenseObj.reduce((sum, exp) => sum + exp.amount, 0);

        const travelSum = expenseRes.data.ExpenseObj.reduce((sum, exp) => (exp.category === "Travel")? sum + exp.amount: sum,0 )
        const grocerySum = expenseRes.data.ExpenseObj.reduce((sum, exp) => (exp.category === "Groceries")? sum + exp.amount: sum,0 )
        const rentSum = expenseRes.data.ExpenseObj.reduce((sum, exp) => (exp.category === "Rent")? sum + exp.amount: sum,0 )
        const restaurantSum = expenseRes.data.ExpenseObj.reduce((sum, exp) => (exp.category === "Restaurant")? sum + exp.amount: sum,0 )
        const coffeeSum = expenseRes.data.ExpenseObj.reduce((sum, exp) => (exp.category === "Coffee")? sum + exp.amount: sum,0 )
        const streamingSum = expenseRes.data.ExpenseObj.reduce((sum, exp) => (exp.category === "Streaming")? sum + exp.amount: sum,0 )

        setTravel(travelSum);
        setGroceries(grocerySum);
        setRent(rentSum);
        setRestaurant(restaurantSum);
        setCoffee(coffeeSum);
        setStreaming(streamingSum);

        setTotalIncome(incomeSum);
        setTotalExpense(expenseSum);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  const totalSaving = totalIncome - totalExpense;

  return { totalIncome, totalExpense, totalSaving, loading , travel, groceries, rent, restaurant, coffee, streaming};
}
