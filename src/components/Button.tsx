import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded w-full disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    {children}
  </button>
);

export default Button;
