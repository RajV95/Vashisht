import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from '../../axios.js'

// Validation schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  expiryDate: z.string().refine(val => !isNaN(new Date(val).getTime()), {
    message: "Invalid date",
  }),
});

export default function AnnouncementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  });

  // Fetch announcements
  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        console.log("Inside fetchAnnouncements")
        const response = await axios.get("/api/admin/get-announcements");
        const data = response.data;
        console.log("Dayta:", data);
        if (response.status === 200) {
          setAnnouncements(data.announcements);
        } else {
          toast.error("Error fetching announcements");
        }
      } catch (error) {
        console.log(error)
        toast.error("Server error");
      }
    }
    fetchAnnouncements();
  }, [announcements]);

  // Submit new announcement
  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/admin/add-announcement", {
        
          mess_id: 1, // Change this dynamically if needed
          content: values.message,
          start_time: new Date().toISOString(), // Current time
          end_time: new Date(values.expiryDate).toISOString(), // Expiry date
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create announcement");

      toast.success("Announcement published successfully!");
      form.reset();
      setAnnouncements((prev) => [...prev, data.announcements]); // Update state
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Delete announcement
  async function deleteAnnouncement(id) {
    try {
      const response = await axios.delete(`/api/admin/delete-announcement/${id}`);
      const data = await response.json();
      if (!response.success) throw new Error(data.message || "Failed to delete");

      toast.success("Announcement deleted successfully!");
      setAnnouncements((prev) => prev.filter((a) => a.announcement_id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mess Timings Change" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your full announcement here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiry Date */}
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="max-w-[300px]">
                    <FormLabel>Expiry Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#1E307B] hover:bg-[#16255e]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Announcement"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Display Announcements */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Current Announcements</h2>
        {console.log("ANn", announcements)}
        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements found</p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li key={announcement.announcement_id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{announcement.content}</h3>
                <p className="text-sm text-gray-600">Expires on: {new Date(announcement.end_time).toLocaleDateString()}</p>
                <Button 
                  onClick={() => deleteAnnouncement(announcement.announcement_id)}
                  className="mt-2 bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
