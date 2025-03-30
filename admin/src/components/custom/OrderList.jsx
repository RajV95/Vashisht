import React from "react";
import OrderRow from "./OrderRow";

const OrderList = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
          <p className="text-sm text-gray-400 mt-1">
            Your purchased items will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderList;