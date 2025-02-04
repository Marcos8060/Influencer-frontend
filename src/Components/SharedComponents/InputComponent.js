import React from "react";
import { InputText } from "primereact/inputtext";

const InputComponent = ({ ...props }) => {
  return (
    <div>
      <InputText
        {...props}
        className="border border-background focus:outline-none rounded px-4 py-3 text-sm w-full"
      />
    </div>
  );
};

export default InputComponent;
