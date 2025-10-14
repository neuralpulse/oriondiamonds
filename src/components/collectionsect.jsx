import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CollectionSection({ id, title, items }) {
  const navigate = useNavigate();

  return (
    <section className="mt-16 mb-12">
      {/* Section Title */}
      <h1
        id={id}
        className="text-4xl md:text-5xl font-bold mb-10 text-[#0a1833] tracking-tight"
      >
        {title}
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {items && items.length > 0 ? (
          items.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() =>
                navigate(`/product/${item.handle}`, {
                  state: item,
                })
              }
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] sm:aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[110px]">
                <h3 className="font-medium text-sm sm:text-lg text-[#0a1833] group-hover:text-[#1a2f5a] transition-colors duration-300 break-words leading-snug">
                  {item.name}
                </h3>

                <p className="text-base sm:text-lg font-semibold text-[#0a1833] mt-2 sm:mt-3">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Wishlist Icon (visible on mobile too) */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-md hover:scale-110 active:scale-95">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a1833] hover:fill-red-500 hover:text-red-500 transition-colors duration-200" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-500 font-medium">
              No products available
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Check back soon for new arrivals
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
