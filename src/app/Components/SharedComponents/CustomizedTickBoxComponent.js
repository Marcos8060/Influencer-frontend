import React from "react";
import { FaCheck } from "react-icons/fa6";

const CustomizedTickBoxComponent = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <div
      className={`border cursor-pointer rounded px-4 py-2 space-y-1 transition-all ${
        checked ? "bg-primary text-white rounded-md" : "bg-white border-input"
      }`}
      onClick={onChange}
    >
      <section className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
        <div>{checked && <FaCheck />}</div>
      </section>
    </div>
  );
};

export default CustomizedTickBoxComponent;
