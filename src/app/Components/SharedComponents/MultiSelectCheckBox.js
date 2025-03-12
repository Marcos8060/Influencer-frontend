import React from "react";
import { MultiSelect } from "primereact/multiselect";

const MultiSelectCheckBox = ({
  value,
  onChange,
  options,
  optionLabel = "name",
  placeholder = "Select Options",
  display = "chip",
  maxSelectedLabels = 3,
  className = "w-full border border-input",
  optionRenderer, // Custom render function for options (e.g., flag support)
}) => {
  return (
    <div className="w-full">
      <MultiSelect
        value={value}
        onChange={onChange}
        options={options}
        optionLabel={optionLabel}
        placeholder={placeholder}
        display={display}
        maxSelectedLabels={maxSelectedLabels}
        className={className}
        itemTemplate={optionRenderer} // Custom renderer for options
      />
    </div>
  );
};

export default MultiSelectCheckBox;
