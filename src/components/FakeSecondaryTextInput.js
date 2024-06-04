import React from "react";

const FakeSecondaryTextInput = ({ title, value }) => {
  return (
    <div className="flex flex-col w-1/3 mx-auto">
      <label className="font-bold text-black">{title}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="rounded-3xl border px-3 py-2 mt-1 bg-gray-100 text-center font-bold"
      />
    </div>
  );
};

export default FakeSecondaryTextInput;
