"use client";

import { Heart, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CollectionSection({ id, title, items = [] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true); // ✅ Loader state
  const [progress, setProgress] = useState(0); // ✅ Progress bar

  // Handle responsive page size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) setItemsPerPage(8);
      else setItemsPerPage(8);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // ✅ Simulate loading progress
  useEffect(() => {
    if (items.length > 0) {
      let progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  }, [items]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Loader screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white">
        <img
          src="/invlogo.jpg"
          alt="Loading..."
          className="w-28 md:w-40 mb-6 animate-pulse"
        />
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-[#0a1833] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mt-3 text-sm font-medium">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <section className="mt-12 mb-12 px-3 md:px-0">
      {/* Section Title */}
      <h1
        id={id}
        className="text-4xl md:text-5xl font-bold mb-10 text-[#0a1833] tracking-tight"
      >
        {title}
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 transition-all duration-500">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => router.push(`/product/${item.handle}`)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-50 aspect-4/5 md:aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* View Button */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/product/${item.handle}`);
                    }}
                    className="w-full bg-white text-[#0a1833] py-2 md:py-2.5 px-3 md:px-4 rounded-lg md:rounded-xl font-medium text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#0a1833] hover:text-white transition-all duration-300 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    View Details
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-5 flex flex-col justify-between min-h-[100px] md:min-h-[110px]">
                <h3 className="font-medium capitalize text-sm md:text-lg text-[#0a1833] group-hover:text-[#1a2f5a] transition-colors duration-300 leading-snug line-clamp-2">
                  {item.name}
                </h3>
              </div>

              {/* Wishlist Icon */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm p-1.5 md:p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 shadow-md hover:scale-110 active:scale-95 z-10">
                <Heart className="w-4 h-4 md:w-6 md:h-6 text-[#0a1833] hover:fill-red-500 hover:text-red-500 transition-colors duration-200" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <p className="text-lg text-gray-500 font-medium">
              No products available
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Check back soon for new arrivals
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100 text-gray-800 border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
