// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/nobglogo.png";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Loader, X } from "lucide-react";
import { shopifyRequest } from "../utils/shopify";
import { SEARCH_PRODUCTS } from "../queries/search";

export function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHero, setIsHero] = useState(true);
  const [hovering, setHovering] = useState(false);

  // Search states (from SearchBar)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mobileSearchRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // === Handle Outside Click to Close Dropdown ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Debounced Search ===
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (query) => {
    try {
      setIsSearching(true);
      const response = await shopifyRequest(SEARCH_PRODUCTS, {
        query,
        first: 10,
      });
      if (response.data?.products?.edges) {
        setSearchResults(response.data.products.edges);
        setShowResults(true);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  // === Focus behavior ===
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current)
      mobileSearchRef.current.focus();
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (desktopSearchOpen && desktopSearchRef.current)
      desktopSearchRef.current.focus();
  }, [desktopSearchOpen]);

  // === Hero transparency tracking ===
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsHero(false);
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
    setMobileMenuOpen(false);
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
      ref={searchRef}
    >
      {/* === NAVBAR TOP ROW === */}
      <div className="p-4 flex items-center justify-between relative">
        <div onClick={() => goToSection("hero")} className="cursor-pointer">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-4">
          {/* === DESKTOP SEARCH === */}
          {window.innerWidth >= 780 && (
            <div className="relative flex items-center">
              <FiSearch
                size={24}
                className="text-white cursor-pointer flex-shrink-0"
                onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
              />
              {desktopSearchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative ml-2 flex items-center"
                >
                  <input
                    type="text"
                    ref={desktopSearchRef}
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() =>
                      searchResults.length > 0 && setShowResults(true)
                    }
                    className="px-3 py-1 outline-none text-white bg-transparent border-b border-gray-400 placeholder-gray-300 w-56"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )}
                  {isSearching && (
                    <Loader className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                  )}
                </form>
              )}
            </div>
          )}

          {/* === MOBILE SEARCH === */}
          {window.innerWidth < 780 && (
            <FiSearch
              size={24}
              className="text-white cursor-pointer"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            />
          )}
          {mobileSearchOpen && window.innerWidth < 780 && (
            <div className="fixed top-[64px] left-0 w-full bg-[#0a1833] px-4 py-2 z-50 md:hidden">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  ref={mobileSearchRef}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchResults.length > 0 && setShowResults(true)
                  }
                  className="w-full px-3 py-2 outline-none text-white rounded-lg bg-[#0a1833] border border-gray-500"
                />
              </form>
            </div>
          )}

          <FiShoppingCart
            size={24}
            className="text-white cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/my-cart")}
          />
          <FiHeart
            size={24}
            className="text-white cursor-pointer hover:text-red-500"
            onClick={() => navigate("/my-list")}
          />
          <FiUser
            size={24}
            className="text-white cursor-pointer hover:text-green-400"
          />

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

      {/* === DESKTOP LINKS === */}
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

      {/* === SEARCH DROPDOWN === */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          <div className="p-2">
            {searchResults.map(({ node: product }) => (
              <Link
                key={product.id}
                to={`/product/${product.handle}`}
                onClick={handleResultClick}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={product.featuredImage?.url || "/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {product.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t p-3 bg-gray-50 text-center">
            <button
              onClick={handleSearchSubmit}
              className="text-sm text-black font-medium hover:underline"
            >
              View all results for "{searchQuery}"
            </button>
          </div>
        </div>
      )}

      {/* === NO RESULTS === */}
      {showResults &&
        !isSearching &&
        searchQuery.length > 2 &&
        searchResults.length === 0 && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-xl p-6 text-center z-50">
            <p className="text-gray-600">
              No products found for "{searchQuery}"
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try different keywords or browse our collections
            </p>
          </div>
        )}

      {/* === MOBILE MENU === */}
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
