import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoDesktop from "../assets/updated.jpeg";
import logoMobile from "../assets/updated.jpeg"; // imported again
import { FiSearch, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";

export function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const deviceWidth = window.innerWidth;

  const mobileSearchRef = useRef(null);
  const desktopSearchRef = useRef(null);

  // Focus when search opens
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (desktopSearchOpen && desktopSearchRef.current) {
      desktopSearchRef.current.focus();
    }
  }, [desktopSearchOpen]);

  const goToSection = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed w-full z-40 top-0 left-0 bg-[#0a1833]">
      <div className="p-4 flex items-center justify-between relative">
        {/* Left: Mobile Search */}
        <div className="flex items-center relative">
          {deviceWidth < 780 && (
            <>
              <FiSearch
                size={24}
                className="text-white cursor-pointer"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              />
              {mobileSearchOpen && (
                <div className="absolute left-full ml-2 top-0 h-full flex items-center">
                  <input
                    type="text"
                    ref={mobileSearchRef}
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-2 py-2 outline-none text-white  w-[55vw] sm:w-[30vw] bg-[#0a1833]"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Logo (two versions) */}
        {/* Desktop Logo */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 hidden md:block"
          onClick={() => goToSection("hero")}
        >
          <img
            src={logoDesktop}
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* Mobile Logo */}
        <div
          className="mx-auto block md:hidden"
          onClick={() => goToSection("hero")}
        >
          <img
            src={logoMobile}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {deviceWidth >= 780 && (
            <>
              <FiSearch
                size={24}
                className="text-white cursor-pointer"
                onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
              />
              {desktopSearchOpen && (
                <input
                  type="text"
                  ref={desktopSearchRef}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-2 outline-none text-white rounded-2xl bg-transparent"
                />
              )}
            </>
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
