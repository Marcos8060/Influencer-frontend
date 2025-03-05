import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

const TextAreaComponent = ({...props}) => {
  return (
    <div>
      <InputTextarea {...props} rows={3} cols={30} className="border border-input focus:outline-none rounded px-4 py-3 text-sm w-full" />
    </div>
  );
};

export default TextAreaComponent;
