import React from "react";

export const Badge = ({ children, className = "" }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {children}
  </span>
);

export const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-300 hover:bg-gray-50"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Select = ({ value, onChange, options }) => (
  <select
  value={value}
  onChange={(e) => onChange(e.target.value)}
  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
>
  {options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>
);