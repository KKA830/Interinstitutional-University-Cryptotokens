// components/FakePrimaryTextInput.js
import React from 'react';

const FakePrimaryTextInput = ({ title, value, shade }) => {
  return (
    <div className="flex flex-col w-1/3 mx-auto">
      <label className="font-bold text-black">
        {title}
      </label>
      <input
        type="text"
        value={value}
        readOnly
        className={'rounded-3xl border px-3 py-2 mt-1 bg-gray-100'}
      />
    </div>
  );
};

export default FakePrimaryTextInput;