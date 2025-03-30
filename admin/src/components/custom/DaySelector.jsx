import React from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DaySelector = ({ selectedDay, setSelectedDay }) => {
    return (
        <div className="flex justify-center space-x-2 mb-6 overflow-x-auto">
            {days.map((day) => (
                <button
                    key={day}
                    className={`px-4 py-2 rounded-md ${
                        selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedDay(day)}
                >
                    {day}
                </button>
            ))}
        </div>
    );
};

export default DaySelector;
