import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, X, Trash2 } from "lucide-react";

export function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadWishlist();

    // Listen for wishlist updates
    const handleWishlistUpdate = () => loadWishlist();
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const loadWishlist = () => {
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(items);
  };

  const removeFromWishlist = (productId) => {
    const items = wishlistItems.filter((item) => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(items));
    setWishlistItems(items);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const clearWishlist = () => {
    if (
      window.confirm("Are you sure you want to clear your entire wishlist?")
    ) {
      localStorage.setItem("wishlist", JSON.stringify([]));
      setWishlistItems([]);
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  };

  const goToProduct = (handle) => {
    navigate(`/product/${handle}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="py-40 text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        </div>
        <h1 className="text-4xl font-bold text-[#0a1833] mb-4">
          Your Wishlist is Empty
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Save your favorite diamond pieces for later viewing.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#0a1833] text-white px-8 py-3 rounded-full hover:bg-[#1a2f5a] transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="py-40 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#0a1833] mb-2">
            Your Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 size={18} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromWishlist(item.id);
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors group/remove"
              title="Remove from wishlist"
            >
              <X
                size={18}
                className="text-gray-600 group-hover/remove:text-red-600 transition-colors"
              />
            </button>

            {/* Image */}
            <div
              className="relative overflow-hidden bg-gray-50 cursor-pointer"
              onClick={() => goToProduct(item.handle)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <h3
                className="font-semibold text-lg text-[#0a1833] line-clamp-2 cursor-pointer hover:text-[#1a2f5a] transition-colors"
                onClick={() => goToProduct(item.handle)}
              >
                {item.title}
              </h3>

              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-[#0a1833]">
                  ₹{parseFloat(item.price).toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => goToProduct(item.handle)}
                  className="flex items-center gap-1 bg-[#0a1833] text-white px-4 py-2 rounded-full hover:bg-[#1a2f5a] transition-colors text-sm"
                >
                  <ShoppingCart size={16} />
                  <span>View</span>
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Added {new Date(item.addedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
