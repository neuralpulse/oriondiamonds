"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { shopifyRequest } from "../../utils/shopify";
import { SEARCH_PRODUCTS } from "../../queries/search";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) performSearch();
  }, [query]);

  const performSearch = async () => {
    try {
      setLoading(true);
      const response = await shopifyRequest(SEARCH_PRODUCTS, {
        query,
        first: 50,
      });

      if (response.data?.products?.edges) {
        setResults(response.data.products.edges);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700 animate-pulse">Searching...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-38">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          {results.length} {results.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(({ node: product }) => (
            <Link
              key={product.id}
              href={`/product/${product.handle}`}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.featuredImage?.url || "/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>

                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-800 text-base md:text-lg truncate mb-1">
                    {product.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-xl text-gray-700 mb-3">
            No products found for "{query}"
          </p>
          <p className="text-gray-500 mb-6">
            Try different keywords or browse our collections
          </p>
          <Link
            href="/rings"
            className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300"
          >
            Browse All Rings
          </Link>
        </div>
      )}
    </div>
  );
}
