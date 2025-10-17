// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_CREATE, CUSTOMER_LOGIN } from "../queries/customer";
import { shopifyRequest } from "../utils/shopify";
import heroImg from "../assets/new.jpg";

export function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await shopifyRequest(CUSTOMER_CREATE, {
        input: {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });

      if (data.customerCreate.customerUserErrors.length > 0) {
        setError(data.customerCreate.customerUserErrors[0].message);
        setLoading(false);
        return;
      }

      await handleLogin(e, true);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleLogin = async (e, isAutoLogin = false) => {
    if (!isAutoLogin) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await shopifyRequest(CUSTOMER_LOGIN, {
        input: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
        setError(data.customerAccessTokenCreate.customerUserErrors[0].message);
        setLoading(false);
        return;
      }

      const { accessToken, expiresAt } =
        data.customerAccessTokenCreate.customerAccessToken;

      localStorage.setItem("shopify_customer_token", accessToken);
      localStorage.setItem("shopify_token_expires", expiresAt);

      navigate("/account");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen mt-10 flex items-center justify-center bg-[#0a1833] overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 animate-heroZoomOut"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 m-6 text-[#0a1833]">
        <h2 className="text-center text-4xl font-serif font-semibold mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isLogin
            ? "Sign in to access your Orion Diamonds account"
            : "Join Orion Diamonds — brilliance redefined"}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form
          className="space-y-5"
          onSubmit={isLogin ? handleLogin : handleSignup}
        >
          {!isLogin && (
            <div className="grid grid-cols-2 gap-3">
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0a1833] focus:border-[#0a1833] text-sm bg-white/90"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0a1833] focus:border-[#0a1833] text-sm bg-white/90"
              />
            </div>
          )}

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0a1833] focus:border-[#0a1833] text-sm bg-white/90"
          />

          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0a1833] focus:border-[#0a1833] text-sm bg-white/90"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a1833] text-white py-2.5 rounded-lg font-medium hover:bg-[#142850] transition disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-[#0a1833] font-medium hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>

      {/* Animation Style */}
      <style>
        {`
          @keyframes heroZoomOut {
            0% { transform: scale(1.4); }
            100% { transform: scale(1.0); }
          }
          .animate-heroZoomOut {
            animation: heroZoomOut 1.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
