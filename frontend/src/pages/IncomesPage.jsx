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

export function IncomesPage() {
    let lastDate = new Date("2025-06-01");
    const [incomes, setincomes] = useState([]);
    const [ogincomes, setOgincomes] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

        const fetchincomes = async () => {
            const response = await axios.get("http://localhost:3000/api/income/getAll",
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                    }
                }
            )

            setincomes(response.data.IncomeObj);
            setOgincomes(response.data.IncomeObj);
        }

        fetchincomes();
    }, [])



    useEffect(()=>{
        if(selectedCategories.length === 0){
            setincomes(ogincomes);
        }
        else{
            const filteredincomes = ogincomes.filter((income) => {
               return selectedCategories.includes(income.category);
            })

            setincomes(filteredincomes);
        }
    }, [selectedCategories, ogincomes])


    let uniqueCategories = [];

    const getUniqueData = (data, property) => {
        let newVal = data.map((curEle) => {
            return curEle[property];
        })
        newVal = [...new Set(newVal)];

        uniqueCategories = [...newVal];
    };
    getUniqueData(ogincomes, "category");


    return <div>
        <NavBar />
        <div className="flex justify-between">
            <div>
                <div className="pl-10 pt-5 text-3xl font-bold">
                    Incomes
                </div>
                <div className="text-gray-500 pl-10">
                    You had {incomes.length} incomes this month
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
                    {dropdownOpen && (<div className="absolute w-60  bg-white rounded-lg  shadow-lg border border-gray-300 pt-1 mt-1 -translate-x-25">
                            
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

                <div className="pt-1 mr-26 px-2 py-2 flex bg-slate-800 text-white h-10 w-23 rounded-3xl cursor-pointer" onClick={() => navigate("/AddIncome")}>
                    <span className="material-symbols-outlined pt-1">
                        add
                    </span>
                    <div className=" pl-1  text-xl ">add</div>
                </div>
            </div>
        </div>
        <div className="pt-7">


            {incomes.map(e => {
                //  const showDate = lastDate !== e.date;
                // const showDate = isEqualDate(lastDate, e.date);
                const showDate = isEqualDate(lastDate, e.date);
                //  {console.log(e.date+ " "+showDate+ " "+ lastDate)}
                lastDate = new Date(e.date);
                let amount = 0;
                if(!showDate){
                    const dateincomes = incomes.filter(cur => isEqualDate(cur.date, e.date));
                    // console.log(dateincomes);
                    amount = 0;
                    dateincomes.map(income => amount += income.amount)
                    // console.log("total amount for " + new Date(e.date).toDateString() + " is " + amount );
                }
                return <div key={e._id}>
                    
                    {(!showDate) ? <div className="flex justify-between"><div className="text-left border-b border-2 border-gray-100 py-4  text-gray-400 font-semibold text-lg pl-11"> {lastDate.toDateString()}</div> 
                    <div className="pt-4 pr-24 mr-1 font-bold text-lg text-gray-400">{amount}₹ </div>
                    </div>  : ""}
                    <Transaction title={e.title} category={e.category} amount={e.amount} Id={e._id} />
                </div>
            })}
        </div>
    </div>
}