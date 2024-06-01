// components/PrimaryTextInput.js
import React from 'react';

const PrimaryTextInput = ({ title, placeholder, isError, onChange, value }) => {
  return (
    <div className="flex flex-col w-1/3 mx-auto">
      <label className={`font-bold ${isError ? 'text-red-500' : 'text-black'}`}>
        {title}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Ensure onChange is properly handled
        className={`rounded-3xl border ${isError ? 'border-red-500' : 'border-black'} px-3 py-2 mt-1`}
      />
    </div>
  );
};

export default PrimaryTextInput;
