import React, { forwardRef } from "react";
import { InputText } from "primereact/inputtext";

const InputComponent = forwardRef(({ className = "", prefix, ...props }, ref) => {
  return (
    <div className="flex items-center w-full">
      {prefix && <span className="mr-2">{prefix}</span>}
      <InputText
        ref={ref}
        {...props}
        className={`border border-input focus:outline-none rounded px-4 py-2 text-sm w-full ${className}`}
      />
    </div>
  );
});

export default InputComponent;
