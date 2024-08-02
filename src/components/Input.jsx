import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="">
      {label && (
        <label className="" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        {...props}
        id={id}
        className="input-feild"
      />
    </div>
  );
});

export default Input;
