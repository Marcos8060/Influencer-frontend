import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function DateFieldComponent({ value, onChange,placeholder, ...rest }) {
    const [date, setDate] = useState(value || null);

    const handleChange = (e) => {
        setDate(e.value);
        if (onChange) onChange(e.value);
    };

    return (
        <div>
            <Calendar
                className="w-full p-2 border border-input font-light text-sm rounded focus:outline-none focus:ring-2  [&>*]:outline-none"
                value={date}
                onChange={handleChange}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
}
