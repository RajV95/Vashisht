

import React, { useEffect, useState } from "react";
import FeedbackList from "../components/custom/FeedbackList";
import { Toaster } from "sonner";
import { toast } from "sonner"
import axios from '../../axios.js';

// Enhanced dummy data with purchase dates
const dummyPurchasedItems = [
    { id: 1, name: "Chicken Biryani", date: "2024-05-25" },
    { id: 2, name: "Paneer Tikka", date: "2024-12-16" },
    { id: 3, name: "Chocolate Brownie", date: "2024-01-17" },
];

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [purchasedItems, setpurchasedItems] = useState([]);

    const handleFeedbackSubmit = async (newFeedback) => {
        setFeedbacks([...feedbacks, newFeedback]);
        console.log(newFeedback.feedback);
        try {
            // Send feedback to backend
            const response = await axios.post('/api/user/review', {
                item_id: newFeedback.item.item_id,
                rating: newFeedback.rating,
                content: newFeedback.feedback,
            });

            // Update local state only after successful submission
            setFeedbacks(prev => [...prev, newFeedback]);
            toast.success("Feedback submitted successfully!");

            // Optional: Refresh purchased items to remove the reviewed item
            const updatedItems = purchasedItems.filter(item => 
                item.id !== newFeedback.item.id
            );
            setpurchasedItems(updatedItems);

        } catch (error) {
            console.error("Feedback submission error:", error);
            toast.error(error.response?.data?.message || "Failed to submit feedback");
        } finally {
            // setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const getRedeemedOrders = async () => {
            try{
                const response = await axios.get('/api/user/redeemed-orders');
                console.log(response.data);
                setpurchasedItems(response.data)
            }
            catch(err){
                console.log(err);
                
            }
        }

        getRedeemedOrders();

    }, [])

    return (
        <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
                    <p className="text-gray-600">We value your opinion on our special items</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recent Purchases</h2>
                    <FeedbackList 
                        purchasedItems={purchasedItems} 
                        onSubmit={handleFeedbackSubmit} 
                    />
                </div>
                
                {feedbacks.length > 0 && (
                    <div className="mt-10 bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Submitted Feedback</h2>
                        <div className="space-y-4">
                            {feedbacks.map((feedback, index) => (
                                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{feedback.item.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                Purchased on {new Date(feedback.item.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mt-2 text-gray-700">{feedback.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Toaster position="top-center" richColors />
        </div>
    );
};

export default Feedback;