// src/pages/Wishlist.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadWishlist();
    const handleWishlistUpdate = () => loadWishlist();
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () =>
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
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
    toast.success("Removed from wishlist");
  };

  const clearWishlist = () => {
    if (
      window.confirm("Are you sure you want to clear your entire wishlist?")
    ) {
      localStorage.setItem("wishlist", JSON.stringify([]));
      setWishlistItems([]);
      window.dispatchEvent(new Event("wishlistUpdated"));
      toast.success("Wishlist cleared");
    }
  };

  const moveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.variantId === item.variantId
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
      toast.success("Quantity increased in cart");
    } else {
      const cartItem = {
        variantId: item.variantId,
        handle: item.handle,
        title: item.title,
        variantTitle: item.variantTitle || "Default",
        image: item.image,
        price: item.price,
        currencyCode: item.currencyCode || "INR",
        quantity: 1,
        selectedOptions: item.selectedOptions || [],
      };
      cart.push(cartItem);
      toast.success("Added to cart");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    removeFromWishlist(item.id);
  };

  const goToProduct = (handle) => navigate(`/product/${handle}`);

  if (wishlistItems.length === 0) {
    return (
      <div className="py-50 text-center max-w-2xl mx-auto px-4 sm:px-6">
        <Heart className="w-20 h-20 mx-auto text-gray-300 mb-6" />
        <h1 className="text-4xl font-bold text-[#0a1833] mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Save your favorite jewelry pieces for later viewing.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#0a1833] text-white px-8 py-3 rounded-full hover:bg-[#1a2f5a] transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-35 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-[#0a1833]">My Wishlist</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium"
          >
            <Trash2 size={18} />
            Clear All
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => goToProduct(item.handle)}
                  className="w-full h-64 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3
                  onClick={() => goToProduct(item.handle)}
                  className="font-semibold text-lg text-[#0a1833] mb-2 cursor-pointer hover:text-[#1a2f5a] line-clamp-2"
                >
                  {item.title}
                </h3>

                {item.variantTitle && item.variantTitle !== "Default Title" && (
                  <p className="text-sm text-gray-600 mb-2">
                    {item.variantTitle}
                  </p>
                )}

                <p className="text-lg font-bold text-[#0a1833] mb-4">
                  ₹{parseFloat(item.price).toFixed(2)}
                </p>

                <div className="mt-auto space-y-2">
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full bg-[#0a1833] text-white py-2 rounded-full hover:bg-[#1a2f5a] transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => goToProduct(item.handle)}
                    className="w-full border border-[#0a1833] text-[#0a1833] py-2 rounded-full hover:bg-gray-50 transition text-sm font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
