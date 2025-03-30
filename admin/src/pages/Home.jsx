import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "../../axios.js";

const Home = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data: ordersData } = await axiosInstance.get('/api/admin/get-orders');
      console.log("Fetched Orders:", ordersData);
      setOrders(ordersData.orders);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalOrders = orders.reduce((sum, order) => sum + parseInt(order.total_quantity, 10), 0);

  return (
    <div className="p-4 sm:p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <SummaryCard title="Total Items Ordered" value={orders.length} className="bg-blue-50 text-blue-800" />
        <SummaryCard title="Total Orders" value={totalOrders} className="bg-green-50 text-green-800" />
      </div>

      {/* Orders Grid */}
      <h2 className="text-xl font-bold mb-4 px-2 sm:px-0">Order Count by Item</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.item_id} order={order} />
        ))}
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, className }) => (
  <Card className={`${className} transition-all hover:shadow-md`}>
    <CardContent className="p-4 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

// Order Card Component
const OrderCard = ({ order }) => (
  <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
    <div className="p-3 flex-grow">
      <h3 className="font-bold text-sm sm:text-base">{order.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <div className="text-right">
          <p className="text-xs text-gray-500">Orders</p>
          <p className="font-bold text-[#1E307B] text-lg">{order.total_quantity}</p>
        </div>
      </div>
    </div>
  </Card>
);

export default Home;
