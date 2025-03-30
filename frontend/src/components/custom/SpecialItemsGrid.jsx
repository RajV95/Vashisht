import React from "react";
import FoodItemCard from "./FoodItemCard";

const SpecialItemsGrid = ({ items, cart, onQuantityChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(item => (
        <FoodItemCard
          key={item.id}
          item={item}
          quantity={cart[item.id] || 0}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
};

export default SpecialItemsGrid;