// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Simulated backend fetch (Replace with actual API call)
//   useEffect(() => {
//     setTimeout(() => {
//       setAnnouncements([
//         { id: 1, title: "New Mess Menu Update", content: "Check out the latest menu changes for the mess!" },
//         { id: 2, title: "Special Items Available!", content: "New special dishes are now available for online ordering." },
//         { id: 3, title: "Feedback Requested", content: "Help us improve! Share your feedback about the mess service." }
//       ]);
//       setLoading(false);
//     }, 1500); // Simulating network delay
//   }, []);

//   return (
//     <Card className="w-full max-w-lg mx-auto px-4 border-none shadow-none">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold">📢 Announcements</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-52">
//           {loading ? (
//             <div className="space-y-4">
//               <Skeleton className="h-8 w-full" />
//               <Skeleton className="h-6 w-3/4" />
//               <Skeleton className="h-8 w-full" />
//               <Skeleton className="h-6 w-3/4" />
//             </div>
//           ) : announcements.length > 0 ? (
//             announcements.map((announcement) => (
//               <div key={announcement.id} className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <h3 className="text-md font-medium">{announcement.title}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{announcement.content}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No announcements available.</p>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default Announcements;

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import axiosInstance from "../../../axios";
import { toast } from "sonner";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/get-announcements");
      setAnnouncements(data.announcements);
      setError(null);
      console.log(data.announcements)
    } catch (err) {
      setError(err.message || "Failed to load announcements");
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnnouncements();
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg font-semibold">📢 Announcements</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={loading || refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[40vh]">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </React.Fragment>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-red-500">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
              >
                Retry
              </Button>
            </div>
          ) : announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-md font-medium mb-1">{announcement.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {announcement.content}
                </p>
                {announcement.createdAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">
              No announcements available
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Announcements;