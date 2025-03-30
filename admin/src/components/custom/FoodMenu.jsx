import React, { useState } from "react";
import DaySelector from "./DaySelector";
import MealTabs from "./MealTabs";
import SpecialItemCard from "./SpecialItemCard";

const menuData = {
    Monday: {
        Breakfast: ["Idli Sambar", "Poha"],
        Lunch: ["Dal Tadka & Rice", "Paneer Butter Masala"],
        "Evening Snacks": ["Samosa", "Tea"],
        Dinner: ["Roti & Mixed Veg", "Gulab Jamun"]
    },
    Tuesday: {
        Breakfast: ["Dosa", "Upma"],
        Lunch: ["Rajma Chawal", "Kadhi Pakoda"],
        "Evening Snacks": ["Pav Bhaji", "Cold Coffee"],
        Dinner: ["Fried Rice & Manchurian", "Rasgulla"]
    }
};

// Dummy Special Items (Fetched from backend later)
const specialItems = {
    Monday: { meal: "Lunch", name: "Chicken Biryani", price: 250, image: "https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani.jpg" },
    Tuesday: { meal: "Dinner", name: "Butter Chicken", price: 280, image: "https://shemins.scdn2.secure.raxcdn.com/wp-content/uploads/2017/05/Shemins-Butter-Chicken-LR.jpg" }
};

const FoodMenu = () => {
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [selectedMeal, setSelectedMeal] = useState("Breakfast");

    return (
        <div className="max-w-5xl mx-auto py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Food Menu</h2>
            <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            <MealTabs selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} />

            {/* Regular Mess Menu (No Add to Cart) */}
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{selectedMeal}</h3>
                <ul className="list-disc list-inside text-gray-700">
                    {menuData[selectedDay]?.[selectedMeal]?.map((item, index) => (
                        <li key={index}>{item}</li>
                    )) || <p className="text-gray-500">No items available.</p>}
                </ul>
            </div>

            {/* Special Item (If available for the selected day) */}
            {specialItems[selectedDay]?.meal === selectedMeal && (
                <div className="mt-6">
                    <h3 className="text-2xl font-bold text-center mb-4">Special Item</h3>
                    <SpecialItemCard item={specialItems[selectedDay]} />
                </div>
            )}
        </div>
    );
};

export default FoodMenu;
