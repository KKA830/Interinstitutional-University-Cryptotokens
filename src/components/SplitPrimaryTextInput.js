import React from 'react';

const SplitPrimaryTextInput = ({ titleLeft, titleRight, placeholderLeft, placeholderRight, isErrorLeft, isErrorRight, onChangeLeft, onChangeRight, valueLeft, valueRight }) => {
  return (
    <div className="flex w-1/3 mx-auto">
      <div className="flex flex-col w-1/2">
        <label className={`font-bold ${isErrorLeft ? 'text-red-500' : 'text-black'}`}>
          {titleLeft}
        </label>
        <input
          type="text"
          placeholder={placeholderLeft}
          value={valueLeft}
          onChange={(e) => onChangeLeft(e.target.value)}
          className={`rounded-3xl border ${isErrorLeft ? 'border-red-500' : 'border-black'} px-3 py-2 mt-1`}
        />
      </div>
      <div className="flex flex-col w-1/2 ml-4">
        <label className={`font-bold ${isErrorRight ? 'text-red-500' : 'text-black'}`}>
          {titleRight}
        </label>
        <input
          type="text"
          placeholder={placeholderRight}
          value={valueRight} 
          onChange={(e) => onChangeLeft(e.target.value)}
          className={`rounded-3xl border ${isErrorRight ? 'border-red-500' : 'border-black'} px-3 py-2 mt-1`}
        />
      </div>
    </div>
  );
};

export default SplitPrimaryTextInput;
