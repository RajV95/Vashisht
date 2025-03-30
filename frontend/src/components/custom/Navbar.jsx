// import { Search, ShoppingCart, Menu, Mail } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { logout } from "../../firebase";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const { user } = useAuth();
//   const actualName = user?.displayName?.split(" ").slice(1).join(" ") || "";

//   return (
//     <header className="flex items-center justify-between px-30 py-3 border-b">
//       {/* Logo */}
//       <div className="flex items-center">
//         <img src="/logo.png" alt="Eat Sure" className="w-35" />
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex items-center gap-1 text-[#1E307B]">
//         <Button variant="ghost" asChild>
//           <Link to="/">Home</Link>
//         </Button>

//         <Button variant="ghost" asChild className=''>
//           <Link to="/menu">Menu</Link>
//         </Button>

//         <Button variant="ghost" asChild>
//           <Link to="/feedback">Feedback</Link>
//         </Button>

//         <Button variant="ghost" asChild>
//           <Link to="/orders">Orders</Link>
//         </Button>

//         {user && (
//           <div className="flex items-center gap-4">
//             <span className="text-[#1E307B] font-semibold">{actualName}</span>
//             <Button onClick={logout} variant="outline" className="text-white border-[#4945BE] bg-[#1E307B]">
//               Logout
//             </Button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { Search, ShoppingCart, Menu, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../firebase";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const actualName = user?.displayName?.split(" ").slice(1).join(" ") || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-3 border-b bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Eat Sure" className="w-28 md:w-35" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4 text-[#1E307B]">
        <Button variant="ghost" asChild>
          <Link to="/">Home</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link to="/menu">Menu</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link to="/feedback">Feedback</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link to="/orders">Orders</Link>
        </Button>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-[#1E307B] font-semibold">{actualName}</span>
            <Button onClick={logout} variant="outline" className="text-white border-[#4945BE] bg-[#1E307B]">
              Logout
            </Button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-[#1E307B]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={28} />
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 gap-3 md:hidden">
          <Link to="/" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/feedback" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Feedback</Link>
          <Link to="/orders" className="text-[#1E307B] text-lg" onClick={() => setIsMenuOpen(false)}>Orders</Link>

          {user && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-[#1E307B] font-semibold">{actualName}</span>
              <Button onClick={logout} variant="outline" className="text-white border-[#4945BE] bg-[#1E307B]">
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
