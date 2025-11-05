"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { shopifyRequest } from "../../utils/shopify";
import { GET_PRODUCT_BY_HANDLE } from "../../queries/products";
import toast from "react-hot-toast";
import CartItemPriceBreakup from "../../components/CartItemPriceBreakup";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("shopify_customer_token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const loadCart = async () => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");

    // Fetch product details for each item to get descriptionHtml
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        if (!item.descriptionHtml && item.handle) {
          try {
            const response = await shopifyRequest(GET_PRODUCT_BY_HANDLE, {
              handle: item.handle,
            });
            if (response.data?.product) {
              return {
                ...item,
                descriptionHtml: response.data.product.descriptionHtml,
              };
            }
          } catch (err) {
            console.error("Error fetching product details:", err);
          }
        }
        return item;
      })
    );

    setCartItems(enrichedItems);
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

  const calculateSubtotal = () =>
    cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );

  const handleCheckout = async () => {
    alert("Checkout clicked!");
    console.log("🚀 CHECKOUT STARTED");
    if (!isLoggedIn) {
      toast.error("Please login to proceed to checkout");
      router.push("/login");
      return;
    }
    console.log("✅ User is logged in");
    setLoading(true);
    setError("");

    try {
      const customerEmail = localStorage.getItem("customer_email");

      if (!customerEmail) {
        toast.error("Customer email not found. Please login again.");
        router.push("/login");
        setLoading(false);
        return;
      }
      console.log("=== CART ITEMS DEBUG ===");
      console.log("Number of items:", cartItems.length);
      cartItems.forEach((item, index) => {
        console.log(`\nItem ${index + 1}:`);
        console.log("  Title:", item.title);
        console.log("  Price:", item.price);
        console.log("  Calculated Price:", item.calculatedPrice);
        console.log("  Full item:", item);
      });
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cartItems,
          customerEmail: customerEmail,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Clear cart
        localStorage.setItem("cart", JSON.stringify([]));
        setCartItems([]);
        window.dispatchEvent(new Event("cartUpdated"));

        toast.success("Redirecting to payment...");

        // Redirect to Shopify payment page
        window.location.href = data.invoiceUrl;
      } else {
        toast.error(data.error || "Failed to create order");
        setError(data.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to create checkout");
      setError(`Failed to create checkout: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-50 text-center max-w-2xl mx-auto px-4 sm:px-6">
        <ShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-6" />
        <h1 className="text-4xl font-bold text-[#0a1833] mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Add some beautiful jewelry pieces to your cart.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-[#0a1833] text-white px-8 py-3 rounded-full hover:bg-[#1a2f5a] transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-25 mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#0a1833] text-center sm:text-left">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium"
          >
            <Trash2 size={18} />
            Clear Cart
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.variantId}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 w-full text-center sm:text-left">
                    <h3 className="font-semibold text-lg text-[#0a1833]">
                      {item.title}
                    </h3>
                    {item.variantTitle &&
                      item.variantTitle !== "Default Title" && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.variantTitle}
                        </p>
                      )}
                    {item.selectedOptions &&
                      item.selectedOptions.length > 0 && (
                        <div className="text-sm text-gray-600 mt-1">
                          {item.selectedOptions.map((option, idx) => (
                            <span key={idx}>
                              {option.name}: {option.value}
                              {idx < item.selectedOptions.length - 1 && " • "}
                            </span>
                          ))}
                        </div>
                      )}
                    <p className="text-lg font-bold text-[#0a1833] mt-2">
                      ₹{parseFloat(item.calculatedPrice).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center justify-between gap-3 sm:gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center justify-center border rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="mt-4 text-lg font-bold text-[#0a1833]">
                      Total: ₹
                      {(item.calculatedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Price Breakup Component */}
                <CartItemPriceBreakup item={item} />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-[#0a1833] mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ₹{calculateSubtotal().toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#0a1833] text-white py-3 rounded-full hover:bg-[#1a2f5a] transition disabled:opacity-50 font-semibold text-sm"
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </button>
              <button
                onClick={() => router.push("/")}
                className="w-full mt-3 border border-[#0a1833] text-[#0a1833] py-3 rounded-full hover:bg-gray-50 transition font-semibold text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
