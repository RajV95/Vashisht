// import React from "react";
// import QRGenerator from "./QRGenerator";
// import { Card, CardContent } from "@/components/ui/card";
// import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";

// const OrderRow = ({ order }) => {
//   const getStatusIcon = () => {
//     switch (order.status) {
//       case "Redeemed":
//         return <CheckCircle2 className="w-4 h-4 text-green-500" />;
//       case "Expired":
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//     }
//   };

//   return (
//     <Card className="border border-gray-200 rounded-lg">
//       <CardContent className="p-4">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           {/* Order Details */}
//           <div className="flex-1">
//             <h3 className="font-medium text-gray-900">{order.item}</h3>
//             <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
//               <div className="flex items-center">
//                 <CalendarDays className="w-4 h-4 mr-1" />
//                 <span>{new Date(order.date).toLocaleDateString()}</span>
//               </div>
//               <div className="flex items-center">
//                 {getStatusIcon()}
//                 <span className="ml-1 capitalize">{order.status}</span>
//               </div>
//               <span className="font-medium text-gray-700">{order.price}</span>
//             </div>
//           </div>

//           {/* QR Code (only if pending) */}
//           {order.status === "Pending" && (
//             <div className="flex-shrink-0">
//               <QRGenerator orderId={order.id} />
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default OrderRow;

import React from "react";
import QRGenerator from "./QRGenerator";
import { QRCodeCanvas } from "qrcode.react"
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";

const OrderRow = ({ order }) => {
  const getStatusIcon = () => {
    switch (order.payment_status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "Expired":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <Card className="border border-gray-200 rounded-lg">
      {/* <p>{typeof(order.qr)}</p> */}
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Image (Left Side) */}
          <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
            <img
              src={order.qr || "/placeholder-food.jpg"}
              alt={order.item}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder-food.jpg";
                e.target.className = "w-full h-full object-contain p-2";
              }}
            />
          </div>

          {/* Content (Right Side) */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">{order.item}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  {getStatusIcon()}
                  <span className="ml-1 capitalize">{order.payment_status === 'success' ? 'Paid' : 'Pending'}</span>
                </div>
                <span className="font-medium text-gray-700">{order.price}</span>
              </div>
            </div>

            {/* QR Code (only if pending) */}
            {order.is_redeemed === false && (
              <div className="flex-shrink-0 self-center sm:self-auto">
                <QRGenerator orderId={order.qr} />
                
                </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderRow;