import React from "react";
import { Button } from "@/components/ui/button";

const CheckoutBar = ({ itemCount, totalPrice, onCheckout }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-medium text-sm sm:text-base">
              {itemCount} {itemCount === 1 ? "Item" : "Items"} Selected
            </span>
            {itemCount > 0 && (
              <span className="text-primary font-bold text-sm sm:text-base">
                ₹{totalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            onClick={onCheckout}
            disabled={itemCount === 0}
            className="bg-[#1E307B] hover:bg-[#16255e] h-11 px-4 sm:px-6 py-2 text-sm sm:text-base"
            size="sm"
          >
            {itemCount > 0 ? "Proceed to Pay" : "Add Items to Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBar;