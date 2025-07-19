// import coffee from "../assets/CoffeeCup.svg"
import { useState } from "react"
import coffee from "../assets/cofee.svg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rent from "../assets/rent.png"
import cofee from "../assets/cofee.svg"
import popcorn from "../assets/popcorn.png"
import foldedMap from "../assets/foldedmap.jpg"
import restaurant from "../assets/restaurant.jpg"
import cart from "../assets/shoppingcart.jpg";

export function Transaction({ title, category, date, amount, Id, icon }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Rent Groceries Streaming Restaurant coffee travel
    const imgSelector = () => {
        if (category === "Rent") return rent;
        else if (category === "Coffee") return cofee;
        else if (category === "Streaming") return popcorn;
        else if (category === "Restaurant") return restaurant;
        else if (category === "Groceries") return cart;
        else if (category === "Travel") return foldedMap;
    };

    const CategoryImg = imgSelector();

    return <div className="flex justify-between  border-b border-2 border-gray-100  px-5  font-medium py-4">
        <div className="flex">
            {
               icon === "debit"? <div className="pl-6"><span className="material-symbols-outlined text-red-600">
                call_received
            </span></div>:
                 <div className="pl-6"><span className="material-symbols-outlined text-green-500 font-bold">
                call_made
            </span></div>
            }
            {/* <div className="pl-6"><span className="material-symbols-outlined text-red-600">
                call_received
            </span></div> */}

            <div className=" pl-4 pr-10 w-80">{title}</div>
            <div className="flex mx-25 px-1  border border-gray-500 rounded-2xl">
                <div className="w-8 h-7 pt-1  ">
                    <img src={CategoryImg} alt="" className="h-5 w-5 ml-1" />
                </div>
                <div className="pr-1">{category}</div>
            </div>
        </div>
        <div className="flex">
            <div className="px-5">{amount}₹</div>
            <div>
                <div className="mx-5 hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span className="material-symbols-outlined">
                        more_vert
                    </span>
                </div>

                {dropdownOpen && (
                    <div className="absolute w-20 py-1 justify-center bg-white rounded-lg overflow-auto shadow-lg border border-gray-300 mt-1">
                        <div className="hover:bg-gray-200 cursor-pointer px-2" onClick={() => {
                            setDropdownOpen(!dropdownOpen);
                            navigate("/updateExpense?expenseId=" + Id);
                        }}>Update</div>
                        <div className="hover:bg-gray-200 cursor-pointer px-2" onClick={async () => {
                            await axios.delete("http://localhost:3000/api/expense/delete?ExpenseId=" + Id, {
                                headers: {
                                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                                }
                            });
                            setDropdownOpen(!dropdownOpen);
                            alert("expense deleted");
                            window.location.reload(); //optimze this to re-render entire parent
                        }
                        }>Delete</div>
                    </div>
                )}
            </div>
        </div>
    </div>
}