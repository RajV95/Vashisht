import React from "react";

const SpecialItemCard = ({ item }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default SpecialItemCard;
