import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Transaction } from "../components/Transaction";
import { useEffect, useRef, useState } from "react";
import rent from "../assets/rent.png"
import cofee from "../assets/cofee.svg"
import popcorn from "../assets/popcorn.png"
import foldedMap from "../assets/foldedmap.jpg"
import restaurant from "../assets/restaurant.jpg"
import cart from "../assets/shoppingcart.jpg";

import axios from "axios"

// const expenses = [
//     {
//         title: "Freelance Payment",
//         date: new Date("2025-06-18"),
//         amount: 500.00,
//         category: "Income"
//     },
//     {
//         title: "Coffee Shop",
//         date: new Date("2025-06-18"),
//         amount: 12.50,
//         category: "Food"
//     },
//     {
//         title: "Online Course Purchase",
//         date: new Date("2025-06-18"),
//         amount: 100.00,
//         category: "Education"
//     },
//     {
//         title: "Gym Membership",
//         date: new Date("2025-06-15"),
//         amount: 60.00,
//         category: "Health"
//     },
//     {
//         title: "Dinner at Restaurant",
//         date: new Date("2025-06-12"),
//         amount: 45.30,
//         category: "Food"
//     },
//     {
//         title: "Salary",
//         date: new Date("2025-06-10"),
//         amount: 2000.00,
//         category: "Income"
//     },
//     {
//         title: "Netflix Subscription",
//         date: new Date("2025-06-07"),
//         amount: 15.99,
//         category: "Entertainment"
//     },
//     {
//         title: "Electricity Bill",
//         date: new Date("2025-06-05"),
//         amount: 75.00,
//         category: "Utilities"
//     },
//     {
//         title: "Groceries",
//         date: new Date("2025-06-01"),
//         amount: 120.50,
//         category: "Food"
//     }
// ];



export function ExpensesPage() {
    let lastDate = new Date("2025-06-01");
    const [expenses, setExpenses] = useState([]);
    const [ogExpenses, setOgExpenses] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [isFilterApplied, setFilterApplied] = useState(0);
    // const [category, setCategory] = useState("Select a category");
    // let expenseArr = [];
    // const [expenseArr, setExpenseArr] = useState([]);
    // const mapRef = useRef(new Map());

    const [selectedCategories, setSelectedCategories] = useState([]);

    const navigate = useNavigate();

    function isEqualDate(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        return (
            d1.toISOString().startsWith(d2.toISOString().substring(0, 10))
        );
    }

    useEffect(() => {

        const fetchExpenses = async () => {
            const response = await axios.get("http://localhost:3000/api/expense/getAll",
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                    }
                }
            )

            setExpenses(response.data.ExpenseObj);
            setOgExpenses(response.data.ExpenseObj);
            // console.log(response.data.ExpenseObj[0].date);
            // const date = response.data.ExpenseObj[0].date;
            // console.log("type of date is "+ typeof(date));
            // console.log(response.data.ExpenseObj[0].date.toISOString());

        }

        fetchExpenses();
    }, [])

    // [isFilterApplied]


    useEffect(()=>{
        if(selectedCategories.length === 0){
            setExpenses(ogExpenses);
        }
        else{
            const filteredExpenses = ogExpenses.filter((expense) => {
               return selectedCategories.includes(expense.category);
            })

            setExpenses(filteredExpenses);
        }
    }, [selectedCategories, ogExpenses])


    let uniqueCategories = [];

    const getUniqueData = (data, property) => {
        let newVal = data.map((curEle) => {
            return curEle[property];
        })
        newVal = [...new Set(newVal)];

        uniqueCategories = [...newVal];
    };
    getUniqueData(ogExpenses, "category");


    return <div>
        <NavBar />
        <div className="flex justify-between">
            <div>
                <div className="pl-10 pt-5 text-3xl font-bold">
                    Expenses
                </div>
                <div className="text-gray-500 pl-10">
                    You had {expenses.length} expenses this month
                </div>
            </div>
            <div className="flex pt-7 text-lg">
                <div>
                    <div className="mr-10 pb- 5 px-5 py-2 flex bg-slate-100 h-10 w-25 rounded-3xl cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <div className="select-none text-xl ">Filter</div>
                        <div>
                            <span className="material-symbols-outlined pt-1">
                                stat_minus_1
                            </span>
                        </div>
                    </div>
                    {dropdownOpen && (
                        // <div className="absolute w-60  bg-white rounded-lg  shadow-lg border border-gray-300 pt-1 mt-1 -translate-x-25">
                        //     {/* <div className="hover:bg-gray-200 cursor-pointer" onClick={() => {setCategory("Food"); setDropdownOpen(!dropdownOpen)}}>Food</div>
                        //         <div className="hover:bg-gray-200 cursor-pointer" onClick={() => {setCategory("Restaurant"); setDropdownOpen(!dropdownOpen)}}>Restaurant</div>
                        //         <div className="hover:bg-gray-200 cursor-pointer" onClick={() => {setCategory("Leisure"); setDropdownOpen(!dropdownOpen)}}>Leisure</div> */}




                        //     <div className="flex justify-between  px-5 py-2">
                        //         <div className="flex">
                        //             <img src={rent} alt="" className="h-6 w-5" />
                        //             <label htmlFor="rent-checkbox" className="select-none ms-2 text-md   cursor-pointer ">
                        //                 Rent
                        //             </label>
                        //         </div>
                        //         <input
                        //             id="rent-checkbox"
                        //             type="checkbox"
                        //             value=""
                        //             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm accent-slate-800 focus:ring-blue-500 mt-1" onChange={async (e) => {
                        //                 if (e.target.checked) {
                        //                     const response = await axios.get("http://localhost:3000/api/expense/filter?category=" +
                        //                         "Rent", {
                        //                         headers: {
                        //                             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                        //                         }
                        //                     });
                        //                     const Expenses = response.data.expenses;
                        //                     // Expenses.mapRef.current(expense => expenseArr.push(expense));

                        //                     setExpenseArr((prev) => {
                        //                         const mp = mapRef.current.get(1);
                        //                         if (!mp) {
                        //                             const newExpenseArr = [...prev, ...Expenses];
                        //                             setExpenses(newExpenseArr);
                        //                             mapRef.current.set(1, [prev.length, newExpenseArr.length]);
                        //                             return newExpenseArr;
                        //                         }
                        //                         return prev; // No change if already filtered
                        //                     });
                        //                 }
                        //                 else {
                        //                     let arr = mapRef.current.get(1);
                        //                     if (arr) {

                        //                         //     for(let i = arr[0]; i < arr[1]; i++){
                        //                         //     expenseArr.delete(i);
                        //                         // }
                        //                         const newExpenseArr = [...expenseArr.slice(0, arr[0]), ...expenseArr.slice(arr[1])];
                        //                         setExpenseArr(newExpenseArr);
                        //                         setExpenses(newExpenseArr);

                        //                         mapRef.current.delete(1);


                        //                     }

                        //                     if (expenseArr.length === 0) setFilterApplied(isFilterApplied + 1);
                        //                 }
                        //             }}
                        //         />
                        //     </div>

                        //     <div className="flex justify-between  px-5 py-2">
                        //         <div className="flex">
                        //             <img src={cart} alt="" className="h-6 w-5" />
                        //             <label htmlFor="grocery-checkbox" className="select-none ms-2 text-md   cursor-pointer ">
                        //                 Groceries
                        //             </label>
                        //         </div>
                        //         <input
                        //             id="grocery-checkbox"
                        //             type="checkbox"
                        //             value=""
                        //             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm accent-slate-800 focus:ring-blue-500 mt-1" onChange={async (e) => {
                        //                 if (e.target.checked) {
                        //                     const response = await axios.get("http://localhost:3000/api/expense/filter?category=" + "Groceries", {
                        //                         headers: {
                        //                             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                        //                         }
                        //                     })
                        //                     // setExpenses(response.data.expenses);

                        //                     const Expenses = response.data.expenses;
                        //                     // Expenses.mapRef.current(expense => expenseArr.push(expense));

                        //                     // setExpenses(expenseArr);
                        //                     // mapRef.current.set(2, [expenseArr.length, expenseArr.length + Expenses.length]);



                        //                     setExpenseArr((prev) => {
                        //                         const mp = mapRef.current.get(2);
                        //                         if (!mp) {
                        //                             const newExpenseArr = [...prev, ...Expenses];
                        //                             setExpenses(newExpenseArr);
                        //                             mapRef.current.set(2, [prev.length, newExpenseArr.length]);
                        //                             return newExpenseArr;
                        //                         }
                        //                         return prev; // No change if already filtered
                        //                     });
                        //                 }
                        //                 else {
                        //                     let arr = mapRef.current.get(2);
                        //                     if (arr) {
                        //                         const newExpenseArr = [...expenseArr.slice(0, arr[0]), ...expenseArr.slice(arr[1])];
                        //                         setExpenseArr(newExpenseArr);
                        //                         setExpenses(newExpenseArr);


                        //                         mapRef.current.delete(2);

                        //                     }

                        //                     if (expenseArr.length === 0) setFilterApplied(isFilterApplied + 1);
                        //                 }
                        //             }}
                        //         />
                        //     </div>

                        //     <div className="flex justify-between  px-5 py-2">
                        //         <div className="flex">
                        //             <img src={popcorn} alt="" className="h-6 w-5" />
                        //             <label htmlFor="streaming-checkbox" className="select-none ms-2 text-md   cursor-pointer ">
                        //                 Streaming
                        //             </label>
                        //         </div>
                        //         <input
                        //             id="streaming-checkbox"
                        //             type="checkbox"
                        //             value=""
                        //             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm accent-slate-800 focus:ring-blue-500 mt-1" onChange={async (e) => {
                        //                 if (e.target.checked) {
                        //                     const response = await axios.get("http://localhost:3000/api/expense/filter?category=" + "Streaming", {
                        //                         headers: {
                        //                             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                        //                         }
                        //                     })
                        //                     // setExpenses(response.data.expenses);

                        //                     const Expenses = response.data.expenses;


                        //                     setExpenseArr((prev) => {
                        //                         const mp = mapRef.current.get(3);
                        //                         if (!mp) {
                        //                             const newExpenseArr = [...prev, ...Expenses];
                        //                             setExpenses(newExpenseArr);
                        //                             mapRef.current.set(3, [prev.length, newExpenseArr.length]);
                        //                             return newExpenseArr;
                        //                         }
                        //                         return prev; // No change if already filtered
                        //                     });
                        //                 }
                        //                 else {
                        //                     let arr = mapRef.current.get(3);
                        //                     if (arr) {
                        //                         const newExpenseArr = [...expenseArr.slice(0, arr[0]), ...expenseArr.slice(arr[1])];
                        //                         setExpenseArr(newExpenseArr);
                        //                         setExpenses(newExpenseArr);


                        //                         mapRef.current.delete(3);

                        //                     }

                        //                     if (expenseArr.length === 0) setFilterApplied(isFilterApplied + 1);
                        //                 }
                        //             }}
                        //         />
                        //     </div>



                        //     <div className="flex justify-between  px-5 py-2">
                        //         <div className="flex">
                        //             <img src={restaurant} alt="" className="h-6 w-5 rounded-full mt-[2px]" />
                        //             <label htmlFor="restaurant-checkbox" className="select-none ms-2 text-md cursor-pointer ">
                        //                 Restaurant
                        //             </label>
                        //         </div>
                        //         <input
                        //             id="restaurant-checkbox"
                        //             type="checkbox"
                        //             value=""
                        //             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm accent-slate-800 focus:ring-blue-500 mt-1" onChange={async (e) => {
                        //                 if (e.target.checked) {
                        //                     const response = await axios.get("http://localhost:3000/api/expense/filter?category=" + "Restaurant", {
                        //                         headers: {
                        //                             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                        //                         }
                        //                     })

                        //                     const Expenses = response.data.expenses;


                        //                     setExpenseArr((prev) => {
                        //                         const mp = mapRef.current.get(4);
                        //                         if (!mp) {
                        //                             const newExpenseArr = [...prev, ...Expenses];
                        //                             setExpenses(newExpenseArr);
                        //                             mapRef.current.set(4, [prev.length, newExpenseArr.length]);
                        //                             return newExpenseArr;
                        //                         }
                        //                         return prev; // No change if already filtered
                        //                     });
                        //                 }
                        //                 else {
                        //                     // setFilterApplied(isFilterApplied + 1);
                        //                     let arr = mapRef.current.get(4);

                        //                     if (arr) {

                        //                         const newExpenseArr = [...expenseArr.slice(0, arr[0]), ...expenseArr.slice(arr[1])];
                        //                         setExpenseArr(newExpenseArr);
                        //                         setExpenses(newExpenseArr);


                        //                         mapRef.current.delete(4);

                        //                     }


                        //                     if (expenseArr.length === 0) setFilterApplied(isFilterApplied + 1);
                        //                 }
                        //             }}
                        //         />
                        //     </div>



                        //     <div className="flex justify-between  px-5 py-2">
                        //         <div className="flex">
                        //             <img src={cofee} alt="" className="h-6 w-5" />
                        //             <label htmlFor="coffee-checkbox" className="select-none ms-2 text-md   cursor-pointer ">
                        //                 Coffee
                        //             </label>
                        //         </div>
                        //         <input
                        //             id="coffee-checkbox"
                        //             type="checkbox"
                        //             value=""
                        //             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm accent-slate-800 focus:ring-blue-500 mt-1" onChange={async (e) => {
                        //                 if (e.target.checked) {
                        //                     const response = await axios.get("http://localhost:3000/api/expense/filter?category=" + "Coffee", {
                        //                         headers: {
                        //                             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                        //                         }
                        //                     })
                        //                     // setExpenses(response.data.expenses);

                        //                     const Expenses = response.data.expenses;


                        //                     setExpenseArr((prev) => {
                        //                         const mp = mapRef.current.get(5);
                        //                         if (!mp) {
                        //                             const newExpenseArr = [...prev, ...Expenses];
                        //                             setExpenses(newExpenseArr);
                        //                             mapRef.current.set(5, [prev.length, newExpenseArr.length]);
                        //                             return newExpenseArr;
                        //                         }
                        //                         return prev; // No change if already filtered
                        //                     });
                        //                 }
                        //                 else {
                        //                     let arr = mapRef.current.get(5);
                        //                     if (arr) {
                        //                         const newExpenseArr = [...expenseArr.slice(0, arr[0]), ...expenseArr.slice(arr[1])];
                        //                         setExpenseArr(newExpenseArr);
                        //                         setExpenses(newExpenseArr);


                        //                         mapRef.current.delete(5);

                        //                     }

                        //                     if (expenseArr.length === 0) setFilterApplied(isFilterApplied + 1);
                        //                 }
                        //             }}
                        //         />
                        //     </div>

                        //     <div className="flex justify-between  px-5 py-2 cursor-pointer">
                        //         <div className="flex ">
                        //             <img src={foldedMap} alt="" className="h-5 w-6 mt-1" />
                        //             <label htmlFor="travel-checkbox" className="select-none ms-2 text-md   cursor-pointer ">
                        //                 Travel
                        //             </label>
                        //         </div>
                        //         <input
                        //             id="travel-checkbox"
                        //             type="checkbox"
                        //             value=""
                        //             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm accent-slate-800 focus:ring-blue-500 mt-1" onChange={async (e) => {
                        //                 if (e.target.checked) {
                        //                     const response = await axios.get("http://localhost:3000/api/expense/filter?category=" + "Travel", {
                        //                         headers: {
                        //                             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                        //                         }
                        //                     })
                        //                     // setExpenses(response.data.expenses);

                        //                     const Expenses = response.data.expenses;


                        //                     setExpenseArr((prev) => {
                        //                         const mp = mapRef.current.get(6);
                        //                         if (!mp) {
                        //                             const newExpenseArr = [...prev, ...Expenses];
                        //                             setExpenses(newExpenseArr);
                        //                             mapRef.current.set(6, [prev.length, newExpenseArr.length]);
                        //                             return newExpenseArr;
                        //                         }
                        //                         return prev; // No change if already filtered
                        //                     });
                        //                 }
                        //                 else {
                        //                     let arr = mapRef.current.get(6);
                        //                     if (arr) {
                        //                         const newExpenseArr = [...expenseArr.slice(0, arr[0]), ...expenseArr.slice(arr[1])];
                        //                         setExpenseArr(newExpenseArr);
                        //                         setExpenses(newExpenseArr);

                        //                     }
                        //                     mapRef.current.delete(6);

                        //                     if (expenseArr.length === 0) setFilterApplied(isFilterApplied + 1);
                        //                 }
                        //             }}
                        //         />
                        //     </div>






                        // </div>

                        // {dropdownOpen && (
                        <div className="absolute w-60  bg-white rounded-lg  shadow-lg border border-gray-300 pt-1 mt-1 -translate-x-25">
                            {/* <div className="hover:bg-gray-200 cursor-pointer" onClick={() => {setCategory("Food"); setDropdownOpen(!dropdownOpen)}}>Food</div>
                                <div className="hover:bg-gray-200 cursor-pointer" onClick={() => {setCategory("Restaurant"); setDropdownOpen(!dropdownOpen)}}>Restaurant</div>
                                <div className="hover:bg-gray-200 cursor-pointer" onClick={() => {setCategory("Leisure"); setDropdownOpen(!dropdownOpen)}}>Leisure</div> */}


                            {uniqueCategories.map((category) => {

                                const imgSelector = () => {
                                    if (category === "Rent") return rent;
                                    else if (category === "Coffee") return cofee;
                                    else if (category === "Streaming") return popcorn;
                                    else if (category === "Restaurant") return restaurant;
                                    else if (category === "Groceries") return cart;
                                    else if (category === "Travel") return foldedMap;
                                };

                                const CategoryImg = imgSelector();

                                return <div className="flex justify-between  px-5 py-2">
                                    <div className="flex">
                                        <img src={CategoryImg} alt="" className="h-6 w-5" />
                                        <label htmlFor={category + "-checkbox"} className="select-none ms-2 text-md   cursor-pointer ">
                                            {category}
                                        </label>
                                    </div>
                                    <input
                                        id={category + "-checkbox"}
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        value=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm accent-slate-800 focus:ring-blue-500 mt-1"
                                        onChange={(e) => {
                                            if(e.target.checked){
                                                // const filteredExpenses = expenses.filter((curEle)=> {
                                                //     return curEle.category === category;
                                                // })

                                                // setExpenses(filteredExpenses);

                                                setSelectedCategories(prev => [...prev, category]);
                                            }
                                            else{
                                                // setFilterApplied(isFilterApplied + 1);
                                                setSelectedCategories(prev => prev.filter(c => c !== category))
                                            }
                                        }}
                                    />
                                </div>

                            })}

                        </div>
                    )}
                </div>

                <div className="pt-1 mr-26 px-2 py-2 flex bg-slate-800 text-white h-10 w-23 rounded-3xl cursor-pointer" onClick={() => navigate("/addExpense")}>
                    <span className="material-symbols-outlined pt-1">
                        add
                    </span>
                    <div className=" pl-1  text-xl ">Add</div>
                </div>
            </div>
        </div>
        <div className="pt-7">


            {expenses.map(e => {
                //  const showDate = lastDate !== e.date;
                // const showDate = isEqualDate(lastDate, e.date);
                const showDate = isEqualDate(lastDate, e.date);
                //  {console.log(e.date+ " "+showDate+ " "+ lastDate)}
                lastDate = new Date(e.date);
                let amount = 0;
                if(!showDate){
                    const dateExpenses = expenses.filter(cur => isEqualDate(cur.date, e.date));
                    // console.log(dateExpenses);
                    amount = 0;
                    dateExpenses.map(expense => amount += expense.amount)
                    // console.log("total amount for " + new Date(e.date).toDateString() + " is " + amount );
                }
                return <div key={e._id}>
                    
                    {(!showDate) ? <div className="flex justify-between"><div className="text-left border-b border-2 border-gray-100 py-4  text-gray-400 font-semibold text-lg pl-11"> {lastDate.toDateString()}</div> 
                    <div className="pt-4 pr-24 mr-1 font-bold text-lg text-gray-400">{amount}₹ </div>
                    </div>  : ""}
                    <Transaction title={e.title} category={e.category} amount={e.amount} Id={e._id} icon = "debit"/>
                </div>
            })}
        </div>
    </div>
}