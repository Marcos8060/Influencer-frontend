import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function DateFieldComponent({ className = "",value, onChange,placeholder, ...rest }) {
    const [date, setDate] = useState(value || null);

    const handleChange = (e) => {
        setDate(e.value);
        if (onChange) onChange(e.value);
    };

    return (
        <div>
            <Calendar
                className={`w-full border border-input font-light text-sm rounded px-4 py-2 focus:outline-none ${className}`}
                value={date}
                onChange={handleChange}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
}
