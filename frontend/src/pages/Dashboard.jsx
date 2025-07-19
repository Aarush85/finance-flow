import { BarChart } from "../components/BarChart";
import { BarChart2 } from "../components/BarChart2";
import Chatbot from "../components/Chatbot";
import { NavBar } from "../components/NavBar";
import { PieChart } from "../components/PieChart";
import { useSummarizeData } from "../data/useSummarizeData";





export function Dashboard() {

    const { totalIncome, totalExpense, totalSaving, loading , travel, groceries, rent, restaurant, coffee, streaming} = useSummarizeData();

    // console.log("totalIncome : " + totalIncome);
    // console.log("totalExpense : " + totalExpense);
    // console.log("totalsaving : " + totalSaving);
    // console.log("Travel : "+ travel);
    // console.log("groceries : " + groceries);
    // console.log("rent: "+ rent);
    // console.log("restaurant: "+ restaurant);
    // console.log("coffee: "+ coffee);
    // console.log("Streaming: " + streaming);

    return <div>
        <NavBar />

        <div className="grid grid-cols-10 pt-10">
            <div className="col-span-5 mr-2 grid grid-cols-2 gap-8">
                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-green-500 font-semibold mb-2">Income</div>
                    <div className="text-lg font-bold mb-3">{totalIncome} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>
                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-red-500 font-semibold mb-2">Expenses</div>
                    <div className="text-lg font-bold mb-3">{totalExpense} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>
                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-amber-500 font-semibold mb-2">Savings</div>
                    <div className="text-lg font-bold mb-3">{totalSaving} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>
            </div>
            <div className="pl-50 col-span-5 ">
                <div className="h-60 w-72">
                    <PieChart />
                </div>
            </div>
            <br/>
            {/* <div className="h-84 w-84"><BarChart/></div> */}

            {/* <div className="flex pt-10 ml-50 "> */}
                    <div className="col-span-5"><BarChart2/></div>
                    <div className="col-span-4 grid grid-cols-3 mt-10 mr-15">
                            <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-green-500 font-semibold mb-2">Travel</div>
                    <div className="text-lg font-bold mb-3">{travel} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>
                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-red-500 font-semibold mb-2">Groceries</div>
                    <div className="text-lg font-bold mb-3">{groceries} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>
                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-amber-500 font-semibold mb-2">Rent</div>
                    <div className="text-lg font-bold mb-3">{rent} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>

                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-green-500 font-semibold mb-2">Restaurant</div>
                    <div className="text-lg font-bold mb-3">{restaurant} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>
                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-red-500 font-semibold mb-2">Coffee</div>
                    <div className="text-lg font-bold mb-3">{coffee} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>
                <div className=" bg-gray-100  ml-5 pl-5 rounded-lg shadow-md shadow-slate-300 h-fit">
                    <div className="text-lg text-amber-500 font-semibold mb-2">Streaming</div>
                    <div className="text-lg font-bold mb-3">{streaming} ₹</div>
                    {/* <div className="">cac</div> */}
                </div>

                    </div>
            {/* </div> */}
        </div>
        <Chatbot/>
    </div>
}