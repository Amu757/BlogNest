/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./components.css"
export default function Button({
  children,
  type = "button",
  ...props
}) {
  return (
    <button
      className="submitbtn"
      {...props}
    >
      {children}
    </button>
  );
}
