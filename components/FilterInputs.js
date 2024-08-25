

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useTodoListContext } from "@/providers/TodoListProvider";

const Example = ({ placeholder, handleChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleChange(date);
    };

    return (
        <div>
            <p>{placeholder}</p>
            <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>
    );
};

const FilterInputs = () => {
    const { setOptions } = useTodoListContext();

    const handleDateInputChange = (placeholder, date) => {
        if (placeholder === "Created after") {
            setOptions((options) => ({ ...options, create_gte: date }));
        } else if (placeholder === "Created before") {
            setOptions((options) => ({ ...options, create_lte: date }));
        } else if (placeholder === "Completion after") {
            setOptions((options) => ({ ...options, completion_gte: date }));
        } else if (placeholder === "Completion before") {
            setOptions((options) => ({ ...options, completion_lte: date }));
        }
    };

    const InputPlaceholder = [
        {
            id: 1,
            placeholder: "Created after",
        },
        {
            id: 2,
            placeholder: "Created before",
        },
        {
            id: 3,
            placeholder: "Completion after",
        },
        {
            id: 4,
            placeholder: "Completion before",
        },
    ];

    return (
        <div className="flex gap-2 mt-7 w-[1065px]">
            {InputPlaceholder.map((input) => (
                <Example
                    key={input.id}
                    placeholder={input.placeholder}
                    handleChange={(date) => handleDateInputChange(input.placeholder, date)}
                />
            ))}
        </div>
    );
};

export default FilterInputs;
