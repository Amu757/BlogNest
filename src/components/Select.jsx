import React, { useId } from "react";
import "./components.css"
function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="select-box">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        
      >
        {options?.map((option)=> (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
