// // import { Search, ShoppingCart, Menu, Mail } from "lucide-react";
// // import { useAuth } from "../../context/AuthContext";
// // import { logout } from "../../firebase";
// // import { Button } from "../ui/button";
// // import { Link } from "react-router-dom";

// // const Navbar = () => {
// //   const { user } = useAuth();
// //   const actualName = user?.displayName?.split(" ").slice(1).join(" ") || "";

// //   return (
// //     <header className="flex items-center justify-between px-30 py-3 border-b">
// //       {/* Logo */}
// //       <div className="flex items-center">
// //         <img src="/logo.png" alt="Eat Sure" className="w-35" />
// //       </div>

// //       {/* Navigation Buttons */}
// //       <div className="flex items-center gap-1 text-[#1E307B]">
// //         <Button variant="ghost" asChild>
// //           <Link to="/">Home</Link>
// //         </Button>

// //         <Button variant="ghost" asChild className=''>
// //           <Link to="/menu">Menu</Link>
// //         </Button>

// //         <Button variant="ghost" asChild>
// //           <Link to="/feedback">Feedback</Link>
// //         </Button>

// //         <Button variant="ghost" asChild>
// //           <Link to="/orders">Orders</Link>
// //         </Button>

// //         {user && (
// //           <div className="flex items-center gap-4">
// //             <span className="text-[#1E307B] font-semibold">{actualName}</span>
// //             <Button onClick={logout} variant="outline" className="text-white border-[#4945BE] bg-[#1E307B]">
// //               Logout
// //             </Button>
// //           </div>
// //         )}
// //       </div>
// //     </header>
// //   );
// // };

// // export default Navbar;

// import { Search, ShoppingCart, Menu, Mail } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { logout } from "../../firebase";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Navbar = () => {
//   const { user } = useAuth();
//   const actualName = user?.displayName?.split(" ").slice(1).join(" ") || "";
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="flex items-center justify-between px-6 md:px-12 py-3 border-b bg-white">
//       {/* Logo */}
//       <div className="flex items-center">
//         <img src="/logo.png" alt="Eat Sure" className="w-28 md:w-35" />
//       </div>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex items-center gap-4 text-[#1E307B]">
//         <Button variant="ghost" asChild>
//           <Link to="/">Home</Link>
//         </Button>

//         {/* <Button variant="ghost" asChild>
//           <Link to="/menu">Menu</Link>
//         </Button> */}

//         <Button variant="ghost" asChild>
//           <Link to="/additems">Add Items</Link>
//         </Button>
        
//         <Button variant="ghost" asChild>
//           <Link to="/announcement">Announcement</Link>
//         </Button>

//         <Button variant="ghost" asChild>
//           <Link to="/viewfeedback">View Feedback</Link>
//         </Button>

//         <Button variant="ghost" asChild>
//           <Link to="/vieworders">View Orders</Link>
//         </Button>

//         {user && (
//           <div className="flex items-center gap-4">
//             <span className="text-[#1E307B] font-semibold">{actualName}</span>
//             <Button onClick={logout} variant="outline" className="text-white border-[#4945BE] bg-[#1E307B]">
//               Logout
//             </Button>
//           </div>
//         )}
//       </nav>

//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden p-2 text-[#1E307B]"
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//       >
//         <Menu size={28} />
//       </button>

//       {/* Mobile Dropdown Menu */}
//       {isMenuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 gap-3 md:hidden">
//           <Link to="/" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
//           <Link to="/menu" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Menu</Link>
//           <Link to="/feedback" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Feedback</Link>
//           <Link to="/orders" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Orders</Link>

//           {user && (
//             <div className="flex flex-col items-center gap-2">
//               <span className="text-[#1E307B] font-semibold">{actualName}</span>
//               <Button onClick={logout} variant="outline" className="text-white border-[#4945BE] bg-[#1E307B]">
//                 Logout
//               </Button>
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../firebase";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const actualName = user?.displayName?.split(" ").slice(1).join(" ") || "";
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1E307B] text-white md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close Button (Mobile) */}
          <div className="flex justify-end md:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="Eat Sure" className="w-28" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <SidebarLink to="/" text="Home" />
            <SidebarLink to="/additems" text="Add Items" />
            <SidebarLink to="/announcement" text="Announcement" />
            <SidebarLink to="/viewfeedback" text="View Feedback" />
          </nav>

          {/* User Info & Logout */}
          {user && (
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-[#1E307B] font-semibold">{actualName}</span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="text-white border-[#4945BE] bg-[#1E307B] hover:bg-[#16255e]"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
      )}
    </>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? "bg-[#1E307B] text-white"
          : "text-[#1E307B] hover:bg-gray-100"
      }`}
    >
      {text}
    </Link>
  );
};

export default Sidebar;