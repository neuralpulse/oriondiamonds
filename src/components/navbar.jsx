import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FiSearch, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (section) => {
    // Navigate to root "/" first (BrowserRouter basename handles /oriondiamonds)
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100); // give time for landing page to render
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed w-full z-40 top-0 left-0 bg-[#1a3e64]">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4"></div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} alt="Logo" className="h-14 w-auto object-contain" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <FiSearch
            size={24}
            className="text-white cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 outline-none text-white rounded-2xl"
            />
          )}
          <FiShoppingCart
            size={24}
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-yellow-400"
          />
          <FiHeart
            size={24}
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-500"
          />
          <FiUser
            size={24}
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-green-400"
          />
        </div>
      </div>

      {/* Category Links Bar */}
      <div className="flex justify-center gap-8 py-2 text-white font-medium">
        <button
          onClick={() => goToSection("rings")}
          className="hover:text-yellow-400 transition"
        >
          Ring
        </button>
        <button
          onClick={() => goToSection("earrings")}
          className="hover:text-yellow-400 transition"
        >
          Earrings
        </button>
        <button
          onClick={() => goToSection("pendents")}
          className="hover:text-yellow-400 transition"
        >
          Pendant
        </button>
        <button
          onClick={() => goToSection("bracelets")}
          className="hover:text-yellow-400 transition"
        >
          Bracelet
        </button>
      </div>
    </div>
  );
}
