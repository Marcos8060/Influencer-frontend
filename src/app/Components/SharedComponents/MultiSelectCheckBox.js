import React from "react";
import { MultiSelect } from "primereact/multiselect";

export default function MultiSelectCheckBox({
  value,
  onChange,
  options,
  optionLabel = "name",
  placeholder = "Select Options",
  display = "chip",
  maxSelectedLabels = 3,
}) {
  return (
    <div className="w-full">
      <MultiSelect
        
        value={value}
        onChange={onChange}
        options={options}
        optionLabel={optionLabel}
        display={display}
        placeholder={placeholder}
        maxSelectedLabels={maxSelectedLabels}
        className="w-full"
      />
    </div>
  );
}
