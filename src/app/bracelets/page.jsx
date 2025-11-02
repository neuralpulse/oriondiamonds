"use client";

import { useState, useEffect } from "react";
import CollectionSection from "../../components/collectionsect";
import { shopifyRequest } from "../../utils/shopify";
import { GET_BRACELETS_COLLECTION } from "../../queries/bracelets_collection";

export default function BraceletsPage() {
  const [bracelets, setBracelets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBracelets();
  }, []);

  const fetchBracelets = async () => {
    try {
      setLoading(true);
      const response = await shopifyRequest(GET_BRACELETS_COLLECTION);

      if (response.data?.collection?.products?.edges) {
        const transformed = transformBraceletsData(
          response.data.collection.products.edges
        );
        setBracelets(transformed);
      }
    } catch (err) {
      console.error("Error fetching bracelets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const transformBraceletsData = (productsEdges) => {
    return productsEdges.map(({ node: product }) => {
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
        price: parseFloat(firstVariant?.price.amount || "0"),
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 text-center">
        <p>Loading Bracelets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 text-center text-red-600">
        <p>Error loading Bracelets: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-8 py-10 md:py-25">
      <CollectionSection
        id="bracelets-collection"
        title="Bracelets"
        items={bracelets}
      />
    </div>
  );
}
