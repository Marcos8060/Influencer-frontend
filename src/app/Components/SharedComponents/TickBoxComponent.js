import React from "react";
import { FaCheck } from "react-icons/fa6";

const TickBoxComponent = ({ label, checked, onChange }) => {
  return (
    <div
      className={`cursor-pointer border border-input rounded px-4 py-2 text-sm w-full 
        ${
          checked
            ? "bg-primary text-white font-semibold rounded"
            : "bg-white"
        }`}
      onClick={onChange}
    >
      <section className="flex items-center justify-between">
        <div>{label}</div>
        <div>{checked && <FaCheck />}</div>
      </section>
    </div>
  );
};

export default TickBoxComponent;
