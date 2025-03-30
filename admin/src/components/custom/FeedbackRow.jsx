// import React, { useState } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import StarRating from "./StarRating";
// import { toast } from "sonner";

// const FeedbackRow = ({ item, onSubmit }) => {
//     const [rating, setRating] = useState(0);
//     const [feedback, setFeedback] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = () => {
//         if (rating === 0) {
//             toast.warning("Please select a rating");
//             return;
//         }
        
//         if (feedback.trim() === "") {
//             toast.warning("Please write your feedback");
//             return;
//         }

//         setIsSubmitting(true);
        
//         try {
//             onSubmit({ item, rating, feedback });
//             toast.success("Thank you for your feedback!");
//             setFeedback("");
//             setRating(0);
//         } catch (error) {
//             toast.error("Failed to submit feedback. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Card className="mb-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-6">
//                 <div className="flex flex-col space-y-4">
//                     <div className="flex items-center justify-between">
//                         <p className="text-lg font-medium text-gray-800">{item}</p>
//                         <StarRating 
//                             rating={rating} 
//                             setRating={setRating} 
//                             className="text-2xl" 
//                         />
//                     </div>
                    
//                     <Textarea 
//                         placeholder="Write your detailed feedback here..." 
//                         className="w-full min-h-[100px] border-gray-300 focus:border-[#1E307B] focus:ring-1 focus:ring-[#1E307B]"
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                     />
                    
//                     <div className="flex justify-end">
//                         <Button 
//                             className="bg-[#1E307B] hover:bg-[#16255e] text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm"
//                             onClick={handleSubmit}
//                             disabled={isSubmitting}
//                         >
//                             {isSubmitting ? "Submitting..." : "Submit Feedback"}
//                         </Button>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// export default FeedbackRow;

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";

const FeedbackRow = ({ item, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (rating === 0) {
            toast.warning("Please select a rating");
            return;
        }
        
        if (feedback.trim() === "") {
            toast.warning("Please write your feedback");
            return;
        }

        setIsSubmitting(true);
        
        try {
            onSubmit({ item, rating, feedback });
            toast.success("Thank you for your feedback!");
            setFeedback("");
            setRating(0);
        } catch (error) {
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <CalendarDays className="w-4 h-4 mr-1" />
                                <span>Purchased on {new Date(item.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                    
                    <Textarea 
                        placeholder="What did you think of this item? Share your experience..."
                        className="min-h-[100px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    
                    <div className="flex justify-end">
                        <Button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : "Submit Feedback"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeedbackRow;