'use client';
import React from "react";
import { Dropdown } from 'primereact/dropdown';

export default function FilterDropdown({ options, value, onChange, placeholder = "Select an option", className = "" }) {
    const selectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const optionTemplate = (option) => (
        <div className="flex align-items-center">
            <div>{option.name}</div>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dropdown 
                value={value} 
                onChange={(e) => onChange(e.value)} 
                options={options} 
                optionLabel="name" 
                placeholder={placeholder} 
                filter 
                valueTemplate={selectedTemplate} 
                itemTemplate={optionTemplate} 
                className={`w-full border border-input rounded-md ${className}`}
                pt={{
                    filterInput: { className: "border border-input rounded-md p-1" }
                }}
            />
        </div>
    );
}
