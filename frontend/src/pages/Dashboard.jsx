import BarChart from "../components/BarChart";
import { BarChart2 } from "../components/BarChart2";
import Chatbot from "../components/Chatbot";
import { NavBar } from "../components/NavBar";
import { PieChart } from "../components/PieChart";
import { useSummarizeData } from "../data/useSummarizeData";





export function Dashboard() {

    const { totalIncome, totalExpense, totalSaving, loading, travel, groceries, rent, restaurant, coffee, streaming } = useSummarizeData();
    const no_of_bars = 29;
    const oneBarVal = 100 / no_of_bars;
    const filledBars = Math.round(totalExpense / (oneBarVal * 1000));
    const unfilledBars = 29 - filledBars;

    console.log("filled: " + filledBars);
    console.log("unfilled: " + unfilledBars);



    return <div>
        <NavBar />

        <div className="bg-gray-300 h-screen/2 flex justify-between">
            <div className="bg-white h-72 w-96 mx-10 mt-10 rounded-3xl shadow-lg px-5">
                <div className="flex justify-between  py-5 ">
                    <div className="font-medium">My Balance</div>
                    <div className="flex">
                        <div>All time</div>
                        <span className="material-symbols-outlined pl-1">
                            arrow_drop_down
                        </span>
                    </div>
                </div>
                <div className="pt-15  text-gray-400 text-sm ">Total balance</div>
                <div className="pt-2 text-5xl font-semibold tracking-wide">₹{totalSaving}</div>

                <div>
                    <div className="flex pt-5 font-light">
                        <div>Total earned last time</div>
                        <div className="text-green-400 pl-2 font-medium">+₹14,500 </div>
                    </div>
                    <div className="flex pt-2 font-light">
                        <div>Total bonus</div>
                        <div className="text-green-400 pl-2 font-medium">+₹700 </div>
                    </div>
                </div>
            </div>

            <div className="bg-white h-72 w-96 mx-10 my-10 rounded-3xl shadow-lg px-5">
                <div className="flex justify-between  py-5 ">
                    <div className="font-medium">My Income</div>
                    <div className="flex">
                        <div className="text-sm">July 2025</div>
                    </div>
                </div>
                <div className="pt-7  text-gray-400 text-sm ">Total income</div>
                <div className="pt-2 text-3xl font-semibold tracking-wide">₹{totalIncome}</div>

                <div className="flex justify-between px-10 pt-5">
                    <div className="flex">Min <div className="text-red-400 pl-2">-2.4% APR</div></div>
                    <div className="flex">Earned <div className="text-green-400 pl-2">+₹ 458.00</div></div>

                </div>

                <div className="flex justify-between pt-5 px-5">
                    <div>
                        <div>Salary</div>
                        <div>₹ 28.3K</div>
                    </div>
                    <div>
                        <div>Business</div>
                        <div>₹ 38.5K</div>
                    </div>
                    <div>
                        <div>Investment</div>
                        <div>₹ 34.4K</div>
                    </div>

                </div>
            </div>


            <div className="bg-white h-72 w-96 mx-10 my-10 rounded-3xl shadow-lg px-5">
                <div className="pt-5 text-3xl font-semibold">₹ {totalExpense}</div>
                <div className="text-gray-400 pt-2 text-sm">Total expense</div>

                <div className="flex justify-between px-10 pt-4">
                    <div className="flex">Min <div className="text-red-400 pl-2">-2.4% APR</div></div>
                    <div className="flex">Earned <div className="text-green-400 pl-2">+₹ 458.00</div></div>

                </div>
                <div className="flex justify-between text-sm pt-7">
                    <div>0</div>
                    <div>50</div>
                    <div>100</div>
                </div>

                <div className="flex">

                    {[...Array(no_of_bars)].map((_, index) => (
                        <div
                            key={index}
                            className={`rounded-lg w-2 h-12 mt-2 mr-1 ${index < filledBars ? "bg-lime-300" : "bg-lime-100"
                                }`}
                        ></div>
                    ))}
                
                </div>


                <div className="flex justify-between pt-4">
                    <div>July 2025</div>
                    <div>With a goal of 75%</div>
                </div>
            </div>

          


        </div>
        <div className="bg-gray-300 h-screen/2 ">
               {/* <div className="bg-white h-72 w-96 mx-10 rounded-3xl shadow-lg px-5">


            </div> */}
           <div className="w-120 h-60 bg-white rounded-xl border border-black ml-50">
             <BarChart/>
           </div>
           
        </div>

        <Chatbot />

    </div>
}