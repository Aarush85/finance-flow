
export function Button({label, onClick}){
    return <div>
        <button onClick= {onClick} className="w-25  text-white bg-gray-800 py-2 my-3 rounded-xl px-5 cursor-pointer mt-7">
            {label}
            </button>
    </div>
}