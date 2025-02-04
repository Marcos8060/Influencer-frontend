import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

const TextAreaComponent = () => {
  return (
    <div>
      <InputTextarea rows={3} cols={30} className="border border-background focus:outline-none rounded px-4 py-3 text-sm w-full" />
    </div>
  );
};

export default TextAreaComponent;
