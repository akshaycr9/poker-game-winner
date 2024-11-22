import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      {...props}
      className="border border-gray-300 rounded px-3 py-2 w-full [&:not(:placeholder-shown):not(:focus):user-valid]:outline [&:not(:placeholder-shown):not(:focus):user-valid]:outline-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default Input;
