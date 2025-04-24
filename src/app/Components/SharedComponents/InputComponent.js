import React, { forwardRef } from "react";
import { InputText } from "primereact/inputtext";

const InputComponent = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div>
      <InputText
        ref={ref}
        {...props}
        className={`border border-input focus:outline-none rounded px-4 py-2 text-sm w-full ${className}`}
      />
    </div>
  );
});

export default InputComponent;
