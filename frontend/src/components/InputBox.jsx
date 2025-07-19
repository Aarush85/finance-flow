

export function InputBox({label, placeholder, onChange, val}){

    return <div >
        <div className="text-left font-medium text-lg py-2">
            {label}
        </div>
        <input type="text" className="rounded-md w-full border border-gray-300 placeholder:font-medium placeholder:text-gray-300 px-2 py-1" placeholder={placeholder} onChange={onChange} value={val}/>
    </div>

}