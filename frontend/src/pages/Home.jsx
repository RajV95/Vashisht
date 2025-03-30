// // import FoodDealsCarousel from '@/components/custom/FoodDealsCarousel';
// // import { useAuth } from '../context/AuthContext';
// // import Announcements from '@/components/custom/Announcements';

// // export default function Home() {
// //   const { user } = useAuth();
// //   const actualName = user?.displayName?.split(" ").slice(1).join(" ") || "";

// //   return (
// //     <div className="min-h-screen dark:bg-gray-900 flex flex-col px-4 py-8">
// //       {/* Welcome Heading */}
// //       <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center">
// //         Welcome to Akshaya, {actualName} 👋
// //       </h1>

// //       {/* Subtitle */}
// //       <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 text-center">
// //         You're successfully authenticated!
// //       </p>

// //       {/* Food Deals Section */}
// //       <div className="mt-8 w-full">
// //         <FoodDealsCarousel />
// //       </div>

// //       {/* Announcements Section */}
// //       <div className="mt-8 w-full px-30">
// //         <Announcements />
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { specialItems } from "@/data/specialItems";
// import FoodItemCard from "@/components/custom/FoodItemCard";
// import CheckoutBar from "@/components/custom/CheckoutBar";
// import Announcements from "@/components/custom/Announcements";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [cart, setCart] = useState({});
//   const [specialItems, setSpecialItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleQuantityChange = (itemId, change) => {
//     setCart(prev => ({
//       ...prev,
//       [itemId]: Math.max(0, (prev[itemId] || 0) + change)
//     }));
//   };

//   const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
//   const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
//     const item = specialItems.find(i => i.id === Number(id));
//     return sum + (item ? item.price * qty : 0);
//   }, 0);

//   const handleCheckout = () => {
//     const selectedItems = specialItems
//       .filter(item => cart[item.id] > 0)
//       .map(item => ({ ...item, quantity: cart[item.id] }));

//     if (selectedItems.length > 0) {
//       navigate("/checkout", { state: { items: selectedItems, totalPrice } });
//     }
//   };

//   return (
//     <div className="relative pb-24 md:pb-20">
//       <main className="container mx-auto px-4 sm:px-6 py-6">
//         {/* Special Items Section */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">Today's Special</h2>
//           <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
//             {specialItems.map(item => (
//               <FoodItemCard
//                 key={item.id}
//                 item={item}
//                 quantity={cart[item.id] || 0}
//                 onIncrement={() => handleQuantityChange(item.id, 1)}
//                 onDecrement={() => handleQuantityChange(item.id, -1)}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Announcements Section */}
//         <section className="mt-12">
//           <Announcements />
//         </section>
//       </main>

//       <CheckoutBar 
//         itemCount={totalItems}
//         totalPrice={totalPrice}
//         onCheckout={handleCheckout}
//       />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import FoodItemCard from "@/components/custom/FoodItemCard";
import CheckoutBar from "@/components/custom/CheckoutBar";
import Announcements from "@/components/custom/Announcements";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react";

const Home = () => {
  const [cart, setCart] = useState({});
  const [specialItems, setSpecialItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  // Fetch special items from backend
  const fetchSpecialItems = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/menu");
      console.log("Received items:", data);
      setSpecialItems(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch special items");
      toast.error("Failed to load menu items");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSpecialItems();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchSpecialItems();
  };

  const handleQuantityChange = (itemId, change) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = specialItems.find(i => i.item_id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleCheckout = async () => {
    const selectedItems = specialItems
      .filter(item => cart[item.item_id] > 0)
      .map(item => ({ ...item, quantity: cart[item.item_id] }));

    if (selectedItems.length > 0) {
      console.log(selectedItems);
      const resp = await axiosInstance.post('/api/user/create-order', { items: selectedItems });
      console.log("Response from Db", resp.data.order_id);
      navigate("/checkout", { state: { items: selectedItems, totalPrice } });
      const payment = await axiosInstance.post("/api/user/checkout", {
				order_id: resp.data.order_id,
				success_url: `${import.meta.env.VITE_FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${import.meta.env.VITE_FRONTEND_URL}/payment-canceled`,
			});
      // 3. Store order info temporarily
      localStorage.setItem('pendingOrder', JSON.stringify({
        orderId: resp.data.order_id,
        items: selectedItems,
        total: totalPrice
      }));
      console.log("Payment response:", payment.data.sessionUrl);
      window.location.replace(payment.data.sessionUrl);
    }

  };

  return (
    <div className="relative pb-24 md:pb-20">
      <main className="container mx-auto px-4 sm:px-6 py-6">
        {/* Special Items Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 px-2">Today's Special</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading || isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-[#1E307B]" />
            </div>
          ) : error ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-red-500">{error}</p>
              <Button
                variant="outline"
                onClick={handleRefresh}
              >
                Retry
              </Button>
            </div>
          ) : specialItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No special items available today
            </div>
          ) : (
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {specialItems.map((item, index) => (
                <FoodItemCard
                  key={`${item.item_id}-${index}`}
                  item={item}
                  quantity={cart[item.item_id] || 0}
                  onIncrement={() => handleQuantityChange(item.item_id, 1)}
                  onDecrement={() => handleQuantityChange(item.item_id, -1)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Announcements Section */}
        <section className="mt-12">
          <Announcements />
        </section>
      </main>

      {/* Only show checkout bar if there are items in cart */}
      {totalItems > 0 && (
        <CheckoutBar
          itemCount={totalItems}
          totalPrice={totalPrice}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default Home;