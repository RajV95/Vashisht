import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star, Search, Filter } from "lucide-react";

// Mock data structure - replace with API call
const mockFeedbackData = [
  {
    id: 1,
    itemName: "Chicken Biryani",
    dateServed: "2023-10-15",
    ratings: [4, 5, 3, 4, 5, 2, 4],
    feedbacks: [
      "Great flavor but a bit dry",
      "Excellent!",
      "Good but could use more spices",
      "Perfectly cooked",
      "Too salty",
    ]
  },
  {
    id: 2,
    itemName: "Paneer Tikka",
    dateServed: "2023-10-16",
    ratings: [5, 4, 5, 5, 4],
    feedbacks: [
      "Best paneer I've had!",
      "Very tasty",
      "Could be more crispy",
      "Perfect texture"
    ]
  },
  // Add more items as needed
];

export default function ViewFeedback() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        // const response = await fetch('/api/feedback');
        // const result = await response.json();
        setData(mockFeedbackData);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate average rating
  const calculateAverage = (ratings) => {
    if (!ratings.length) return 0;
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  };

  // Filter data based on search and date filter
  const filteredData = data.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "recent" && 
                        new Date(item.dateServed) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    return matchesSearch && matchesDate;
  });

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Customer Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by item name..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="recent">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("all");
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Feedback Table */}
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No feedback found matching your criteria
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Item Name</TableHead>
                  <TableHead className="w-[120px]">Date Served</TableHead>
                  <TableHead className="w-[120px]">Avg Rating</TableHead>
                  <TableHead>Feedback Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell>
                      {new Date(item.dateServed).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{calculateAverage(item.ratings)}</span>
                        <span className="text-muted-foreground text-xs">
                          ({item.ratings.length})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                        {item.feedbacks.map((feedback, i) => (
                          <div key={i} className="text-sm border-l-2 pl-2 border-gray-200">
                            {feedback}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}