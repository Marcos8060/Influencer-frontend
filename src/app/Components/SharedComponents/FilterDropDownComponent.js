"use client";
import React from "react";
import { Dropdown } from "primereact/dropdown";

export default function FilterDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) {
  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={value}
        onChange={(e) => onChange(e.value)}
        options={options}
        placeholder={placeholder}
        filter
        className={`w-full border border-input rounded-md ${className}`}
        pt={{
          filterInput: { className: "border border-input rounded-md p-1" },
        }}
      />
    </div>
  );
}
