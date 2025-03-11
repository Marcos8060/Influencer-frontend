import React from "react";

const CustomizedTickBoxComponent = ({ label, description, checked, onChange }) => {
  return (
    <div
      className={`border cursor-pointer rounded px-4 py-2 space-y-1 transition-all ${
        checked ? "border-2 border-primary rounded-md" : "bg-white border-input"
      }`}
      onClick={onChange}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  );
};

export default CustomizedTickBoxComponent;
