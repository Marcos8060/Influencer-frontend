"use client";
import React from "react";
import { MultiSelect } from "primereact/multiselect";

export default function MultiSelectDropdown({
  options = [],
  value = [],
  onChange,
  optionLabel = "name",
  placeholder = "Select options",
  className = "w-full md:w-20rem",
  display = "chip", // or "comma"
}) {
  return (
    <div className="card flex justify-content-center">
      <MultiSelect
        value={value}
        options={options}
        onChange={(e) => onChange(e.value)}
        optionLabel={optionLabel}
        placeholder={placeholder}
        display={display}
        filter
        className={`border border-input rounded-md text-sm ${className}`}
        pt={{
          filterInput: {
            className: "border border-input rounded-md p-1 w-full",
          },
        }}
      />
    </div>
  );
}
