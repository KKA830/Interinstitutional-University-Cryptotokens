import React from "react";

const PrimaryMultiOption = ({ title, options, isError, onChange }) => {
  return (
    <div className="flex flex-col w-1/3 mx-auto">
      <label className={`font-bold ${isError ? "text-red-500" : "text-black"}`}>
        {title}
      </label>
      <select
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-3xl border ${
          isError ? "border-red-500" : "border-black"
        } bg-gray-100 px-3 py-2 mt-1`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrimaryMultiOption;
