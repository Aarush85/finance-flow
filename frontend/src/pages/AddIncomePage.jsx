import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function AddIncomePage() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [category, setCategory] = useState("Select a category");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    return <div className="">
        <NavBar />
        <div className="bg-slate-200 h-screen">
            <div className="flex flex-col justify-center items-center pt-20">
                <div className="bg-white h-max w-84 rounded-lg text-center px-5 p-2 pt-6 pb-4 shadow-lg">
                    <div className="font-semibold text-3xl  pb-5">Add New Income</div>

                    <InputBox label={"Title"} placeholder={"Enter the title"} onChange={(e)=> setTitle(e.target.value)} />
                    {/* <InputBox label={"Category"} placeholder={"Enter the category"} /> */}

                    <div >
                        <div className="text-left font-medium text-lg py-2">
                            Category
                        </div >
                        <div className="flex  justify-between rounded-md w-full h-8 border border-gray-300 px-2 py-1 cursor-pointer hover:bg-gray-200" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <button className="" >{category}
                            </button>
                            <span className="material-symbols-outlined focus:outline-none">
                                keyboard_arrow_down
                            </span>

                        </div>

                        {dropdownOpen && (
                            <div className="absolute w-74 justify-center bg-white rounded-lg overflow-auto shadow-lg border border-gray-300 mt-1">
                                <div className="hover:bg-gray-200 cursor-pointer" onClick={(e) => {setCategory("Job"); setDropdownOpen(!dropdownOpen)}}>Job</div>
                                <div className="hover:bg-gray-200 cursor-pointer" onClick={(e) => {setCategory("Part-time"); setDropdownOpen(!dropdownOpen)}}>Part-time</div>
                                <div className="hover:bg-gray-200 cursor-pointer" onClick={(e) => {setCategory("Investments"); setDropdownOpen(!dropdownOpen)}}>Investments</div>
                                <div className="hover:bg-gray-200 cursor-pointer" onClick={(e) => {setCategory("Freelancing"); setDropdownOpen(!dropdownOpen)}}>Freelancing</div>
                                <div className="hover:bg-gray-200 cursor-pointer" onClick={(e) => {setCategory("Rental Income"); setDropdownOpen(!dropdownOpen)}}>Rental Income</div>
                            </div>
                        )}
                    </div>

                    <div >
                        <div className="text-left font-medium text-lg py-2">
                            Date
                        </div>
                        <input type="date" className="rounded-md w-full border border-gray-300 placeholder:font-medium placeholder:text-gray-300 px-2 py-1" placeholder={"Select the date"} onChange={(e) => setDate(e.target.value)}/>
                    </div>

                    <InputBox label={"Amount"} placeholder={"Enter the amount"} onChange={(e) => setAmount((parseInt)(e.target.value))}/>

                    <Button label={"Add"} onClick={async ()=> {
                        await axios.post("http://localhost:3000/api/income/add", {
                            title, category, date, amount
                        }, {
                            headers: {
                                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY1NDhmOGFiODU2MjkyZDM3MDQ3ZTYiLCJpYXQiOjE3NTE0NjgyODB9.6mzoLB11EB8oi370dpJbyfaM39KrsMx0SBIDZUkwFwg"
                            }
                        })

                        alert("New income added succefully");
                        navigate("/incomes");

                    }}/>
                </div>
            </div>
        </div>
    </div>
}