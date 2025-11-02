"use client";

import { useState, useEffect } from "react";
import CollectionSection from "../../components/collectionsect";
import { shopifyRequest } from "../../utils/shopify";
import { GET_EARRINGS_COLLECTION } from "../../queries/earrings_collection";

export default function EarringsPage() {
  const [earrings, setEarrings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEarings();
  }, []);

  const fetchEarings = async () => {
    try {
      setLoading(true);
      const response = await shopifyRequest(GET_EARRINGS_COLLECTION);

      if (response.data?.collection?.products?.edges) {
        const transformedEarrings = transformEarringsData(
          response.data.collection.products.edges
        );
        setEarrings(transformedEarrings);
      }
    } catch (err) {
      console.error("Error fetching earrings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const transformEarringsData = (productsEdges) => {
    // First, transform the data
    const transformed = productsEdges.map(({ node: product }) => {
      const firstVariant = product.variants.edges[0]?.node;

      const goldKarat =
        firstVariant?.selectedOptions.find((opt) => opt.name === "Gold Karat")
          ?.value || "";

      const goldColor =
        firstVariant?.selectedOptions.find((opt) => opt.name === "Gold Color")
          ?.value || "";

      const diamondGrade =
        firstVariant?.selectedOptions.find(
          (opt) => opt.name === "Diamond Grade"
        )?.value || "";

      const diamondDetails = extractDiamondDetails(product.description);

      return {
        productCode: firstVariant?.sku || "",
        handle: product.handle,
        name: product.title,
        gold: `${goldKarat} ${goldColor}`.trim(),
        goldPrice: firstVariant?.price.amount || "0",
        diamondDetails: {
          carat: diamondDetails.carat,
          quality: diamondGrade || diamondDetails.quality,
          shape: diamondDetails.shape,
          count: diamondDetails.count,
        },
        price: firstVariant?.price.amount || "0",
        currency: firstVariant?.price.currencyCode || "INR",
        image: product.featuredImage?.url || firstVariant?.image?.url || "",
        images:
          product.images?.edges?.map((img) => ({
            url: img.node.url,
            altText: img.node.altText,
          })) || [],
        allVariants: product.variants.edges.map((v) => v.node),
      };
    });

    // Then, sort the transformed data
    return transformed.sort((a, b) => {
      const titleA = a.name.toLowerCase();
      const titleB = b.name.toLowerCase();

      const aHasStuds = titleA.includes("studs");
      const bHasStuds = titleB.includes("studs");
      const aHasHoops = titleA.includes("hoops");
      const bHasHoops = titleB.includes("hoops");

      // Studs come first
      if (aHasStuds && !bHasStuds) return -1;
      if (!aHasStuds && bHasStuds) return 1;

      // Then hoops
      if (aHasHoops && !bHasHoops) return -1;
      if (!aHasHoops && bHasHoops) return 1;

      // Everything else maintains original order
      return 0;
    });
  };

  const extractDiamondDetails = (description) => {
    const caratMatch = description.match(/Total Diamond Carat:\s*([\d.]+)/);
    const qualityMatch = description.match(/Diamond Quality:\s*([^\n]+)/);
    const shapeMatch = description.match(/Diamond Shape:\s*([^\n]+)/);
    const countMatch = description.match(/Total Diamonds:\s*(\d+)/);

    return {
      carat: caratMatch?.[1] || "",
      quality: qualityMatch?.[1]?.trim() || "",
      shape: shapeMatch?.[1]?.trim() || "",
      count: countMatch?.[1] || "",
    };
  };

  if (loading) {
    return (
      <div className="m-10 py-10 text-center">
        <p>Loading Earrings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-10 py-10 text-center text-red-600">
        <p>Error loading Earrings: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-8 py-10 md:py-25">
      <CollectionSection title="Earrings" items={earrings} />
    </div>
  );
}
