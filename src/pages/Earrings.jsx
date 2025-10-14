import { useState, useEffect } from "react";
import CollectionSection from "../components/collectionsect";
import { shopifyRequest } from "../utils/shopify";
import { GET_EARRINGS_COLLECTION } from "../queries/earrings_collection";

export function Earrings() {
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
      console.error("Error fetching rings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const transformEarringsData = (productsEdges) => {
    return productsEdges.map(({ node: product }) => {
      // Get the first variant as default
      const firstVariant = product.variants.edges[0]?.node;

      // Extract gold information from variants
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

      // Extract diamond details from description
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
    <div className="m-10 py-10">
      <CollectionSection title="Earrings" items={earrings} />
    </div>
  );
}
