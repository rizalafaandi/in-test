import React from "react";

const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  );
};

export default InputField;
