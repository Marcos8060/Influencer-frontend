import React, { useState } from "react";
import { Chips } from "primereact/chips";

const MultiInputComponent = ({ value, onChange, placeholder = "Type and press Enter", className = "border border-input rounded px-4 py-2 text-xs" }) => {
  return (
    <div className={`card p-fluid ${className}`}>
      <Chips value={value} onChange={(e) => onChange(e.value)} placeholder={placeholder} />
    </div>
  );
};

export default MultiInputComponent;
