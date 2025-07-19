import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { useState } from "react";

export function NavBar() {

    const navigate = useNavigate();
      const [dropdownOpen, setDropdownOpen] = useState(false);

    return <div className="flex bg-white justify-between shadow p-3 py-5 items-center sticky top-0">
        <div className="pl-7 ">
            <img src={logo} alt="" className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex">
            <div className=" flex px-25 text-lg font-medium " onClick={() => {
                //localstorage.delete("token")
                navigate("/dashboard");
                }}>
                <div className="pr-2 cursor-pointer">
                    <span className="material-symbols-outlined">
                        dashboard
                    </span>
                </div>
                <div className="cursor-pointer">Dashboard</div>
            </div>
            <div className="px-25 text-lg font-medium flex" onClick={() => navigate("/expenses")}>
                <div className="pr-2"><span className="material-symbols-outlined cursor-pointer">
                    payments
                </span></div>
                <div className="cursor-pointer">Expenses</div>
            </div>
            <div className="px-25 text-lg font-medium flex" onClick={() => navigate("/incomes")}>
                <div className="pr-2"><span className="material-symbols-outlined cursor-pointer">
                    paid
                </span></div>
                <div className="cursor-pointer">Incomes</div>
            </div>
        </div>
        <div className="pr-8 cursor-pointer rounded-full" >
            <button type= "button" id="dropdownDefaultButton" className=" hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 rounded-full" data-dropdown-toggle = "dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}> 
            <span className="material-symbols-outlined">
                account_circle
            </span>
            </button>


             {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-20 z-10 mr-2 justify-center">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a href="#" className="flex px-2 py-2 hover:bg-gray-200 rounded-lg" onClick={() => (navigate("/dashboard"))}>Sign out</a>
              </li>
            </ul>
          </div>
        )}
      

        
        </div>
    </div>
}