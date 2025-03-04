import React, { forwardRef } from "react";
import { InputText } from "primereact/inputtext";

const InputComponent = forwardRef(({ ...props }, ref) => {
  return (
    <div>
      <InputText
        ref={ref} // ✅ Pass ref properly
        {...props}
        className="border border-input focus:outline-none rounded px-4 py-2 text-sm w-full"
      />
    </div>
  );
});

export default InputComponent;
