import React from "react";

const categories = ["All", "Main Course", "Breakfast", "Dessert", "Beverage"];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <div className="flex justify-center space-x-4 mb-6">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-md ${
                        selectedCategory === category
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
