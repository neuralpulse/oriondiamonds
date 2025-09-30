import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const { state: product } = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedGold, setSelectedGold] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState("");
  const [goldOpen, setGoldOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 my-4 max-w-5xl mx-auto p-4">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md aspect-square flex items-center justify-center max-h-[60vh]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {/* Placeholder thumbnails for now */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded border border-gray-200 aspect-square flex items-center justify-center cursor-pointer hover:border-gray-400"
              >
                <Package size={24} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">{"★".repeat(5)}</div>
              <span className="text-sm text-gray-600">(24 reviews)</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ₹{product.diamondPrice}
            </div>
            <div className="text-sm text-green-600 font-medium mt-1">
              Special Offer Available (Use code: DIWALI50)
            </div>
          </div>

          {/* Color Selection */}
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Color:
            </label>
            <div className="flex gap-2">
              {["White", "Yellow", "Pink"].map((c) => (
                <div
                  key={c}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedColor === c ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c.toLowerCase() }}
                  onClick={() => setSelectedColor(c)}
                ></div>
              ))}
            </div>
            {selectedColor && (
              <span className="ml-2 text-gray-700 font-medium">
                {selectedColor}
              </span>
            )}
          </div>

          {/* Gold Carat Selection */}
          <div className="mt-4 relative w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gold Carat
            </label>
            <div
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm cursor-pointer flex justify-between items-center hover:shadow-md"
              onClick={() => setGoldOpen(!goldOpen)}
            >
              <span>{selectedGold ? `${selectedGold}K` : "Select Carat"}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  goldOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {goldOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                {[9, 10, 14, 18, 22].map((c) => (
                  <div
                    key={c}
                    className="px-4 py-2 cursor-pointer hover:bg-[#0a1833]/10"
                    onClick={() => {
                      setSelectedGold(c);
                      setGoldOpen(false);
                    }}
                  >
                    {c}K
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[#0a1833]/90 text-white py-3 rounded-full font-medium hover:bg-[#0a1833] flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <Share2 size={20} />
            </button>
          </div>

          <button className="w-full bg-[#ffc73a]/90 text-white py-3 rounded-full font-medium hover:bg-[#ffc73a]">
            Buy Now
          </button>

          {/* Features */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-sm">Free Shipping & Insurance</p>
                <p className="text-xs text-gray-600">On every order</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-sm">Certified Diamonds</p>
                <p className="text-xs text-gray-600">
                  100% authentic with certificate
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-sm">Delivery Timeline</p>
                <p className="text-xs text-gray-600">
                  5-7 days (in stock) | 25 days (made to order)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow-md max-w-5xl mx-auto p-4">
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex whitespace-nowrap">
            {["description", "specifications", "reviews", "shipping"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize ${
                    activeTab === tab
                      ? "text-[#3c5a85] border-b-2 border-[#3c5a85]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "description" && (
            <p className="text-gray-700">
              This is a premium {product.name}, crafted with care. Perfect for
              special occasions or daily elegance.
            </p>
          )}

          {activeTab === "specifications" && (
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 font-medium text-gray-900">Gold</td>
                  <td className="py-3 text-gray-700">{product.gold}</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-gray-900">Diamond</td>
                  <td className="py-3 text-gray-700">
                    {product.diamondDetails}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-gray-900">Price</td>
                  <td className="py-3 text-gray-700">{product.price}</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === "reviews" && (
            <p className="text-gray-700">Reviews coming soon...</p>
          )}

          {activeTab === "shipping" && (
            <p className="text-gray-700">
              Free shipping worldwide. Delivery in 5-7 days (in stock) or 25
              days (made to order).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
