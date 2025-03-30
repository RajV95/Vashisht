import React, { useState, useEffect } from "react";
import OrderList from "../components/custom/OrderList";
import { Toaster } from "sonner";

// Mock data (replace with API fetch)
const mockOrders = [
  {
    id: "order_1",
    item: "Chicken Biryani",
    date: "2023-10-15",
    price: "₹120",
    status: "Pending", // "Pending" | "Redeemed" | "Expired"
    url:"https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani.jpg",
  },
  {
    id: "order_2",
    item: "Paneer Tikka",
    date: "2023-10-16",
    price: "₹90",
    status: "Pending",
    url:"https://shemins.scdn2.secure.raxcdn.com/wp-content/uploads/2017/05/Shemins-Butter-Chicken-LR.jpg",
  },
  {
    id: "order_3",
    item: "Chocolate Brownie",
    date: "2023-10-17",
    price: "₹60",
    status: "Pending",
    url:"https://shemins.scdn2.secure.raxcdn.com/wp-content/uploads/2017/05/Shemins-Butter-Chicken-LR.jpg",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setOrders(mockOrders);
  }, []);

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600 mt-2">
            Scan the QR code at the mess counter to redeem your order.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <OrderList orders={orders} />
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default Orders;