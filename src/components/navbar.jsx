import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/nobglogo.png";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

export function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHero, setIsHero] = useState(true);
  const [hovering, setHovering] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const mobileSearchRef = useRef(null);
  const desktopSearchRef = useRef(null);

  // Focus inputs when opened
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current)
      mobileSearchRef.current.focus();
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (desktopSearchOpen && desktopSearchRef.current)
      desktopSearchRef.current.focus();
  }, [desktopSearchOpen]);

  // Track scroll for hero transparency only on home
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsHero(false); // force solid navbar on other pages
      return;
    }

    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setIsHero(rect.top >= -50 && rect.bottom > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const goToSection = (section) => {
    setMobileMenuOpen(false); // close menu after click
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
    <div
      className={`fixed w-full z-40 top-0 left-0 transition-colors duration-300 ${
        location.pathname === "/"
          ? isHero
            ? hovering
              ? "bg-[#0a1833]"
              : "bg-transparent"
            : "bg-[#0a1833]"
          : "bg-[#0a1833]"
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="p-4 flex items-center justify-between relative">
        {/* Logo left */}
        <div onClick={() => goToSection("hero")} className="cursor-pointer">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        </div>

        {/* Right side: icons + hamburger */}
        <div className="flex items-center gap-4">
          {/* Search */}
          {window.innerWidth >= 780 && (
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

          {/* Mobile Search Icon */}
          {window.innerWidth < 780 && (
            <FiSearch
              size={24}
              className="text-white cursor-pointer"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            />
          )}

          {/* Mobile Search Overlay */}
          {mobileSearchOpen && window.innerWidth < 780 && (
            <div className="fixed top-[64px] left-0 w-full bg-[#0a1833] px-4 py-2 z-50 md:hidden">
              <input
                type="text"
                ref={mobileSearchRef}
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 outline-none text-white rounded-lg bg-[#0a1833] border border-gray-500"
              />
            </div>
          )}

          {/* Always visible icons */}
          <FiShoppingCart
            size={24}
            className="text-white cursor-pointer hover:text-yellow-400"
            onClick={() => {
              navigate("/my-cart");
            }}
          />
          <FiHeart
            size={24}
            className="text-white cursor-pointer hover:text-red-500"
            onClick={() => {
              navigate("/my-list");
            }}
          />
          <FiUser
            size={24}
            className="text-white cursor-pointer hover:text-green-400"
          />

          {/* Hamburger only on mobile */}
          <div className="md:hidden">
            {mobileMenuOpen ? (
              <FiX
                size={26}
                className="text-white cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              />
            ) : (
              <FiMenu
                size={26}
                className="text-white cursor-pointer"
                onClick={() => setMobileMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation links */}
      <div className="hidden md:flex justify-center gap-6 md:gap-12 py-2 text-white font-medium text-sm md:text-base">
        {[
          { label: "Welcome", id: "hero" },
          { label: "Collection", id: "collections" },
          { label: "About Us", id: "about" },
          { label: "Customizations", id: "customizations" },
          { label: "FAQs", id: "faqs" },
          { label: "Contact Us", id: "contact" },
        ].map((link) => (
          <button
            key={link.id}
            onClick={() => goToSection(link.id)}
            className="no-underline hover:underline transition cursor-pointer"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Mobile dropdown menu (only links) */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#0a1833] text-white font-medium text-base py-4 gap-4">
          {[
            { label: "Welcome", id: "hero" },
            { label: "Collection", id: "collections" },
            { label: "About Us", id: "about" },
            { label: "Customizations", id: "customizations" },
            { label: "FAQs", id: "faqs" },
            { label: "Contact Us", id: "contact" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => goToSection(link.id)}
              className="no-underline hover:underline transition cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
