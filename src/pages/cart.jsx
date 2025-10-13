// Cart.jsx - Enhanced Cart Page
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

export function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  };

  const updateQuantity = (variantId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.variantId === variantId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (variantId) => {
    const updatedCart = cartItems.filter(
      (item) => item.variantId !== variantId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.18; // 18% GST
    return subtotal + tax;
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-40 text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        </div>
        <h1 className="text-4xl font-bold text-[#0a1833] mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Add some beautiful jewelry pieces to your cart.
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
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#0a1833]">Your Cart</h1>
          <p className="text-gray-600 mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 size={18} />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.variantId}
              className="bg-white rounded-2xl shadow-sm p-6 flex gap-6 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div
                className="w-32 h-32 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${item.handle}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3
                    className="font-semibold text-lg text-[#0a1833] cursor-pointer hover:text-[#1a2f5a] transition-colors"
                    onClick={() => navigate(`/product/${item.handle}`)}
                  >
                    {item.title}
                  </h3>
                  {item.selectedOptions && (
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      {Object.entries(item.selectedOptions).map(
                        ([key, value]) => (
                          <p key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </p>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#0a1833]">
                      ₹
                      {(parseFloat(item.price) * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{parseFloat(item.price).toLocaleString("en-IN")} each
                    </p>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.variantId)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-[#0a1833] mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">
                  ₹{calculateSubtotal().toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>GST (18%)</span>
                <span className="font-medium">
                  ₹{(calculateSubtotal() * 0.18).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-[#0a1833]">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#0a1833] text-white py-4 rounded-full font-semibold hover:bg-[#1a2f5a] transition-colors mb-3">
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full border border-[#0a1833] text-[#0a1833] py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
