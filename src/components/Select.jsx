import React, { useId } from "react";

//Assignment to check whether this is better className, or className='', in handling the case where none input corresponding to it is send which one takes the care more properly in detail
function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className="" htmlFor={id}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {/* Here we used this format options?.map(()=>{} instead of the staright away without ? because if none elements were passed the app woudl definietly crash as per sir but i dont know this is an Assignment too work on it and find out */}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
