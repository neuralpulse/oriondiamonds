// src/pages/Account.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GET_CUSTOMER_INFO } from "../queries/customer";
import { shopifyRequest } from "../utils/shopify";

export function Account() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    const token = localStorage.getItem("shopify_customer_token");
    const expiresAt = localStorage.getItem("shopify_token_expires");

    if (!token || (expiresAt && new Date(expiresAt) < new Date())) {
      localStorage.removeItem("shopify_customer_token");
      localStorage.removeItem("shopify_token_expires");
      navigate("/login");
      return;
    }

    try {
      const { data } = await shopifyRequest(GET_CUSTOMER_INFO, {
        customerAccessToken: token,
      });
      if (data.customer) setCustomer(data.customer);
      else handleLogout();
    } catch (err) {
      setError("Failed to load account information");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("shopify_customer_token");
    localStorage.removeItem("shopify_token_expires");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-[#0a1833] font-medium">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-40 px-4 sm:px-8 lg:px-12 text-[#0a1833]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-4xl font-serif font-semibold text-[#0a1833]">
                Welcome back, {customer?.firstName}!
              </h1>
              <p className="text-gray-600 mt-2">{customer?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#0a1833] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#142850] transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="space-y-8">
            {/* Account Details */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-6 font-serif">
                Account Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{customer?.displayName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customer?.email}</p>
                </div>
                {customer?.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">
                    {new Date(customer?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Default Address */}
            {customer?.defaultAddress && (
              <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition">
                <h2 className="text-2xl font-semibold mb-6 font-serif">
                  Default Address
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  <p>
                    {customer.defaultAddress.firstName}{" "}
                    {customer.defaultAddress.lastName}
                  </p>
                  <p>{customer.defaultAddress.address1}</p>
                  {customer.defaultAddress.address2 && (
                    <p>{customer.defaultAddress.address2}</p>
                  )}
                  <p>
                    {customer.defaultAddress.city},{" "}
                    {customer.defaultAddress.province}{" "}
                    {customer.defaultAddress.zip}
                  </p>
                  <p>{customer.defaultAddress.country}</p>
                  {customer.defaultAddress.phone && (
                    <p>{customer.defaultAddress.phone}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 font-serif">
                Order History
              </h2>

              {customer?.orders.edges.length === 0 ? (
                <p className="text-gray-600">No orders yet</p>
              ) : (
                <div className="space-y-5">
                  {customer?.orders.edges.map(({ node: order }) => (
                    <div
                      key={order.id}
                      className="border border-gray-100 rounded-xl p-5 hover:shadow-lg transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold text-lg">
                            Order #{order.orderNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.processedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {order.totalPrice.currencyCode}{" "}
                            {parseFloat(order.totalPrice.amount).toFixed(2)}
                          </p>
                          <span
                            className={`text-xs px-3 py-1.5 rounded-full ${
                              order.fulfillmentStatus === "FULFILLED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.fulfillmentStatus || "Pending"}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.lineItems.edges.map(({ node: item }) => (
                          <div
                            key={item.variant?.id}
                            className="flex items-center space-x-4 text-sm border-t border-gray-100 pt-3"
                          >
                            {item.variant?.image && (
                              <img
                                src={item.variant.image.url}
                                alt={item.variant.image.altText || item.title}
                                className="w-14 h-14 object-cover rounded-lg shadow-sm"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-[#0a1833]">
                                {item.title}
                              </p>
                              {item.variant?.title !== "Default Title" && (
                                <p className="text-gray-500">
                                  {item.variant?.title}
                                </p>
                              )}
                            </div>
                            <p className="text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
