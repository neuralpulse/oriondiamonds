// src/pages/Cart.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { CREATE_CART, CART_BUYER_IDENTITY_UPDATE } from "../queries/checkout";
import { shopifyRequest } from "../utils/shopify";
import toast from "react-hot-toast";
export function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
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

  const calculateSubtotal = () =>
    cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );

  const calculateTax = () => calculateSubtotal() * 0.18;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const isLoggedIn = !!localStorage.getItem("shopify_customer_token");
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to proceed to checkout");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Cart items:", cartItems);

      // Prepare line items with attributes
      const lines = cartItems.map((item) => {
        const lineItem = {
          merchandiseId: item.variantId,
          quantity: item.quantity,
        };

        // Add custom attributes (like ring size)
        if (item.selectedOptions && item.selectedOptions.length > 0) {
          lineItem.attributes = item.selectedOptions.map((option) => ({
            key: option.name,
            value: option.value,
          }));
        }

        return lineItem;
      });

      console.log("Lines for cart with attributes:", lines);

      // Create cart using new Cart API
      const cartResponse = await shopifyRequest(CREATE_CART, {
        input: {
          lines: lines,
        },
      });

      console.log("Cart response:", cartResponse);

      const cartData = cartResponse.data;

      if (cartData.cartCreate.userErrors.length > 0) {
        console.error("Cart user errors:", cartData.cartCreate.userErrors);
        setError(cartData.cartCreate.userErrors[0].message);
        setLoading(false);
        return;
      }

      const cart = cartData.cartCreate.cart;
      const cartId = cart.id;

      console.log("Cart created:", cart);

      // Associate customer with cart
      const customerToken = localStorage.getItem("shopify_customer_token");

      if (customerToken) {
        const buyerIdentityResponse = await shopifyRequest(
          CART_BUYER_IDENTITY_UPDATE,
          {
            cartId: cartId,
            buyerIdentity: {
              customerAccessToken: customerToken,
            },
          }
        );

        console.log("Buyer identity response:", buyerIdentityResponse);

        if (
          buyerIdentityResponse.data?.cartBuyerIdentityUpdate?.userErrors
            ?.length > 0
        ) {
          console.warn(
            "Could not associate customer:",
            buyerIdentityResponse.data.cartBuyerIdentityUpdate.userErrors[0]
              .message
          );
        }
      }

      // Clear cart after successful cart creation
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));

      // Redirect to Shopify checkout
      window.open(cart.checkoutUrl, "_blank");
    } catch (err) {
      console.error("Checkout error:", err);
      setError(`Failed to create checkout: ${err.message}`);
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
          onClick={() => navigate("/")}
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
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start"
              >
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
                  {item.selectedOptions && item.selectedOptions.length > 0 && (
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
                    ₹{parseFloat(item.price).toFixed(2)}
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
                  <p className="text-sm text-gray-600 sm:mt-2">
                    Total: ₹
                    {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
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
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span className="font-semibold">
                    ₹{calculateTax().toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-[#0a1833]">
                    ₹{calculateTotal().toFixed(2)}
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
                onClick={() => navigate("/")}
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
