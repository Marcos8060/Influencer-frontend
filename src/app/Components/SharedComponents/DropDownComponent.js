import React from "react";
import { Dropdown } from "primereact/dropdown";

const DropdownComponent = ({ options, value, onChange, placeholder = "Select an option", className = "w-full md:w-14rem border border-input rounded text-xs" }) => {
    return (
        <div className="card flex justify-content-center">
            <Dropdown 
                value={value} 
                onChange={(e) => onChange(e.value)} 
                options={options} 
                optionLabel="name" 
                placeholder={placeholder} 
                className={className}
                panelClassName="custom-dropdown-panel"
            />
        </div>
    );
};

export default DropdownComponent;
