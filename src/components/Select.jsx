import React, {useId} from "react";

function Select({
    options,
    label,
    className='',
    ...props
}, ref) {
    const id = useId()
    return (
       <div>
        {label && <label htmlFor={id} className=""></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black 
            outline-none focus:bg-gray-50 duration-200 border
            border-gray-200 w-full ${className}`}
        >
            {/* note:- options se usually hume array hi milta hai, toh error se 
            bachne k lie by default array hi le lete hai */}

            {/* options pe directly map nahi lagayenge, because ho sakta hai, usme value hi n ho
            then usse bachne k lie conditionally loop lagayenge */}

            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
       </div>
    )
}

export default React.forwardRef(Select)

//note:- their input and Select both forwardRef but, both have 
// the different way of usage forwardRef

//but Select wala tarika aashan hai.