import React from "react";

const TickBoxComponent = ({ label, checked, onChange }) => {
  return (
    <div
      className={`cursor-pointer border border-input rounded px-4 py-2 text-sm w-full 
        ${checked ? "border-2 border-primary shadow-md font-semibold rounded" : "bg-white"}`}
      onClick={onChange}
    >
      {label}
    </div>
  );
};

export default TickBoxComponent;
