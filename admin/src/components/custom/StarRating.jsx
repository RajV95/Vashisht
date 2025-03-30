

import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex items-center">
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                        key={star} 
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                    >
                        <Star 
                            className={`h-6 w-6 transition-colors ${rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-100"}`}
                        />
                    </button>
                ))}
            </div>
            {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-500">
                    {rating} star{rating !== 1 ? 's' : ''}
                </span>
            )}
        </div>
    );
};

export default StarRating;