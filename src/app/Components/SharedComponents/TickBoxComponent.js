import React from "react";
import { GiCheckMark } from "react-icons/gi";

const TickBoxComponent = ({ label, checked, onChange }) => {
  return (
    <div
      className={`cursor-pointer border border-input rounded px-4 py-2 w-full 
        ${
          checked
            ? "border-2 border-primary bg-background font-semibold rounded"
            : "bg-white"
        }`}
      onClick={onChange}
    >
      <section className="flex items-center justify-between">
        <div>{label}</div>
        <div>{checked && <GiCheckMark className="text-xl" />}</div>
      </section>
    </div>
  );
};

export default TickBoxComponent;
