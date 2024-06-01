// components/PrimaryButton.js
import React from 'react';

const PrimaryButton = ({ label, onClick, isError }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl px-4 py-2 mt-2 font-bold text-white ${isError ? 'bg-red-500 hover:bg-red-700' : 'bg-[#005daa] hover:bg-[#004080]'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004080] w-1/3`}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
