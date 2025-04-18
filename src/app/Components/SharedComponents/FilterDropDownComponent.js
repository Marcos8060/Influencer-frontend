"use client";
import React from "react";
import { Dropdown } from "primereact/dropdown";

export default function FilterDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "w-full",
  optionLabel = "name", // <-- default prop
}) {
  return (
    <div className="card flex justify-content-center w-full">
      <Dropdown
        value={value}
        onChange={(e) => onChange(e.value)}
        options={options}
        optionLabel={optionLabel} // <-- important line
        placeholder={placeholder}
        filter
        className={`w-full border border-input rounded-md ${className}`}
        pt={{
          filterInput: { className: "border border-input rounded-md p-1 w-full" },
        }}
      />
    </div>
  );
}
