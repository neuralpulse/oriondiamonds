import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Link as LinkIcon,
  Facebook,
  Twitter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { shopifyRequest } from "../utils/shopify";
import { GET_PRODUCT_BY_HANDLE } from "../queries/products";
import ProductAccordion from "../components/accordian";
import diamondcarot from "../assets/dct.jpg";

export default function ProductDetails() {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const addToCart = () => {
    if (!selectedVariant) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItemIndex = cart.findIndex(
      (item) => item.variantId === selectedVariant.id
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      const newItem = {
        variantId: selectedVariant.id,
        handle: product.handle,
        title: product.title,
        image: selectedVariant.image?.url || product.featuredImage?.url,
        price: parseFloat(selectedVariant.price.amount),
        quantity,
        selectedOptions,
      };
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to cart!");
  };

  useEffect(() => {
    fetchProduct();
  }, [handle]);

  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsWishlisted(wishlist.some((item) => item.id === product.id));
    }
  }, [product]);

  const fetchProduct = async () => {
    if (!handle) return;

    try {
      setLoading(true);
      const response = await shopifyRequest(GET_PRODUCT_BY_HANDLE, { handle });

      if (response.data?.product) {
        const productData = response.data.product;
        setProduct(productData);

        setSelectedImage(
          productData?.images?.edges?.[0]?.node?.url ||
            productData?.featuredImage?.url
        );

        const defaultVariant = productData.variants.edges[0]?.node;
        if (defaultVariant) {
          setSelectedVariant(defaultVariant);

          const initialOptions = {};
          defaultVariant.selectedOptions.forEach((option) => {
            initialOptions[option.name] = option.value;
          });
          setSelectedOptions(initialOptions);
        }
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (optionName, optionValue) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue,
    };
    setSelectedOptions(newSelectedOptions);

    const variant = product.variants.edges.find(({ node }) =>
      node.selectedOptions.every(
        (opt) => newSelectedOptions[opt.name] === opt.value
      )
    )?.node;

    if (variant) setSelectedVariant(variant);
  };

  const getOptionValues = (optionName) => {
    if (!product) return [];
    const values = new Set();
    product.variants.edges.forEach(({ node }) => {
      const opt = node.selectedOptions.find((o) => o.name === optionName);
      if (opt) values.add(opt.value);
    });
    return Array.from(values);
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isWishlisted) {
      const newWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setIsWishlisted(false);
    } else {
      const wishlistItem = {
        id: product.id,
        handle: product.handle,
        title: product.title,
        image: selectedVariant?.image?.url || product.featuredImage?.url,
        price: selectedVariant?.price?.amount,
        variant: selectedVariant?.id,
        addedAt: new Date().toISOString(),
      };
      wishlist.push(wishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    }

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.title}`;

    switch (platform) {
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
            setShowShareMenu(false);
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
        break;

      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank",
          "width=600,height=400"
        );
        setShowShareMenu(false);
        break;

      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank",
          "width=600,height=400"
        );
        setShowShareMenu(false);
        break;

      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
          "_blank"
        );
        setShowShareMenu(false);
        break;

      case "native":
        if (navigator.share) {
          try {
            await navigator.share({
              title: product.title,
              text: text,
              url: url,
            });
            setShowShareMenu(false);
          } catch (err) {
            console.log("Share cancelled or failed:", err);
          }
        }
        break;

      default:
        break;
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  // Get all images as an array
  const allImages = [
    ...(product.images?.edges?.map(({ node }) => node.url) || []),
    diamondcarot,
  ];
  const currentImageIndex = allImages.indexOf(
    selectedImage || selectedVariant?.image?.url || product.featuredImage?.url
  );

  const handleMouseMove = (e) => {
    if (!isZoomed || window.innerWidth <= 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % allImages.length
        : (currentImageIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") navigateImage("prev");
    if (e.key === "ArrowRight") navigateImage("next");
    if (e.key === "Escape") setIsModalOpen(false);
  };

  return (
    <>
      <div className="pt-40 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
              className="bg-white rounded-lg shadow-md aspect-square flex items-center justify-center max-h-[60vh] relative overflow-hidden cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => window.innerWidth > 768 && setIsZoomed(true)}
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  setIsZoomed(false);
                  setZoomPosition({ x: 50, y: 50 });
                }
              }}
              onMouseMove={handleMouseMove}
            >
              <img
                src={
                  selectedImage ||
                  selectedVariant?.image?.url ||
                  product.featuredImage?.url
                }
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-transform duration-200"
                style={
                  isZoomed && window.innerWidth > 768
                    ? {
                        transform: "scale(2)",
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/70 px-2 py-0.5 rounded-md">
                Click to expand
              </span>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto">
              {/* Product images */}
              {product.images?.edges?.map(({ node }) => (
                <button
                  key={node.url}
                  onClick={() => setSelectedImage(node.url)}
                  className={`border-2 rounded-lg p-1 flex-shrink-0 transition-all ${
                    selectedImage === node.url
                      ? "border-black"
                      : "border-transparent hover:border-gray-400"
                  }`}
                >
                  <img
                    src={node.url}
                    alt={node.altText || product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </button>
              ))}

              {/* DCT.jpg thumbnail - always first */}
              <button
                onClick={() => setSelectedImage(diamondcarot)}
                className={`border-2 rounded-lg p-1 flex-shrink-0 transition-all ${
                  selectedImage === diamondcarot
                    ? "border-black"
                    : "border-transparent hover:border-gray-400"
                }`}
              >
                <img
                  src={diamondcarot}
                  alt="DCT"
                  className="w-20 h-20 object-cover rounded-md"
                />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-2xl font-semibold text-gray-900">
              ₹{selectedVariant?.price?.amount || "0.00"}{" "}
              <span className="text-sm text-gray-600">
                {selectedVariant?.price?.in}
              </span>
            </p>

            {/* Options */}
            <div className="space-y-4">
              {/* Color Selection */}
              {product.options.some((opt) => opt.name === "Gold Color") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gold Color
                  </label>
                  <div className="flex gap-3">
                    {[
                      { name: "Rose Gold", color: "#ffcccc" },
                      { name: "Yellow Gold", color: "#ffcc66" },
                      { name: "White Gold", color: "#cccccc" },
                    ].map(({ name, color }) => (
                      <label key={name} className="cursor-pointer">
                        <input
                          type="radio"
                          name="gold-color"
                          value={name}
                          checked={selectedOptions["Gold Color"] === name}
                          onChange={() =>
                            handleOptionChange("Gold Color", name)
                          }
                          className="hidden"
                        />
                        <span
                          className={`block w-8 h-8 rounded-full border-1 transition-transform ${
                            selectedOptions["Gold Color"] === name
                              ? "border-black scale-110"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                        ></span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Gold Carat Dropdown */}
              {product.options.some((opt) => opt.name === "Gold Karat") && (
                <div className="relative w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gold Carat
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 cursor-pointer"
                    value={selectedOptions["Gold Karat"] || ""}
                    onChange={(e) =>
                      handleOptionChange("Gold Karat", e.target.value)
                    }
                  >
                    <option value="">Select Carat</option>
                    {getOptionValues("Gold Karat").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Other Options */}
              {product.options
                .filter(
                  (opt) =>
                    opt.name !== "Gold Color" && opt.name !== "Gold Karat"
                )
                .map((option) => (
                  <div key={option.id} className="space-y-2">
                    <label className="block text-sm font-medium">
                      {option.name}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {getOptionValues(option.name).map((value) => (
                        <button
                          key={value}
                          className={`px-3 py-1 border rounded-md transition-colors ${
                            selectedOptions[option.name] === value
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                          }`}
                          onClick={() => handleOptionChange(option.name, value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
                className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all ${
                  isWishlisted ? "bg-red-50 border-red-500" : "hover:bg-gray-50"
                }`}
                title={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  size={20}
                  className={`transition-colors ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "hover:text-red-500"
                  }`}
                />
              </button>

              {/* Share Button with Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-12 h-12 border rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  title="Share product"
                >
                  <Share2 size={20} />
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        {copySuccess ? (
                          <>
                            <Check size={18} className="text-green-500" />
                            <span className="text-green-500">Link copied!</span>
                          </>
                        ) : (
                          <>
                            <LinkIcon size={18} />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleShare("whatsapp")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <svg
                          className="w-[18px] h-[18px]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        <span>WhatsApp</span>
                      </button>

                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </button>

                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <Twitter size={18} />
                        <span>Twitter</span>
                      </button>

                      {navigator.share && (
                        <button
                          onClick={() => handleShare("native")}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors border-t"
                        >
                          <Share2 size={18} />
                          <span>More options...</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ProductAccordion
          product={product}
          selectedOptions={selectedOptions}
          selectedVariant={selectedVariant}
        />
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          {allImages.length > 1 && (
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Image */}
          <img
            src={
              selectedImage ||
              selectedVariant?.image?.url ||
              product.featuredImage?.url
            }
            alt={product.title}
            className="max-h-full max-w-full object-contain p-4"
          />

          {/* Next Button */}
          {allImages.length > 1 && (
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
            {allImages.map((imageUrl, index) => (
              <button
                key={imageUrl}
                onClick={() => setSelectedImage(imageUrl)}
                className={`border-2 rounded-lg flex-shrink-0 transition-all ${
                  index === currentImageIndex
                    ? "border-white"
                    : "border-transparent hover:border-gray-400"
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
