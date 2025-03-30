import React, { useState } from "react";
import SpecialItemSelect from "./SpecialItemSelect";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FeedbackForm = ({ onSubmit }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItem && feedback) {
            onSubmit({ item: selectedItem, text: feedback });
            setFeedback("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow-lg rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>

            <SpecialItemSelect selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

            <Textarea 
                placeholder="Write your feedback here..." 
                className="w-full mt-3 p-2 border rounded-md"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />

            <Button type="submit" className="mt-4 w-full">
                Submit Feedback
            </Button>
        </form>
    );
};

export default FeedbackForm;
