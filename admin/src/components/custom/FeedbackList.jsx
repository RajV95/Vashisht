

import React from "react";
import FeedbackRow from "./FeedbackRow";

const FeedbackList = ({ purchasedItems, onSubmit }) => {
    return (
        <div className="space-y-4">
            {purchasedItems.length > 0 ? (
                purchasedItems.map((item) => (
                    <FeedbackRow 
                        key={item.id} 
                        item={item} 
                        onSubmit={onSubmit} 
                    />
                ))
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No special items purchased yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Your feedback will appear here when you purchase special items.</p>
                </div>
            )}
        </div>
    );
};

export default FeedbackList;