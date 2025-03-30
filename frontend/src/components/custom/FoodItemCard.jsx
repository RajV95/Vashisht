import React from "react";
import { Button } from "@/components/ui/button";

const FoodItemCard = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder-food.jpg";
            e.target.className = "w-full h-full object-contain p-4 bg-gray-50";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3 sm:p-4">
        <div className="flex-grow">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1">{item.name}</h3>
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-3">{item.description}</p>
        </div>

        <div className="flex justify-between items-end">
          <span className="font-bold text-sm sm:text-base">₹{item.price}</span>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant={quantity > 0 ? "outline" : "ghost"}
              size="xs"
              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
              onClick={onDecrement}
              disabled={quantity <= 0}
            >
              -
            </Button>
            <span className="text-xs sm:text-sm w-5 text-center">{quantity || 0}</span>
            <Button
              variant="outline"
              size="xs"
              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
              onClick={onIncrement}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;