import { useState, useEffect } from "react";
import CollectionSection from "../components/collectionsect";
import { shopifyRequest } from "../utils/shopify";
import { GET_BRACELETS_COLLECTION } from "../queries/bracelets_collection";

export function Bracelets() {
  const [Bracelets, setBracelets] = useState([]);
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
        const transformedBracelets = transformBraceletsData(
          response.data.collection.products.edges
        );
        setBracelets(transformedBracelets);
      }
    } catch (err) {
      console.error("Error fetching rings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const transformBraceletsData = (productsEdges) => {
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
        <p>Loading Bracelets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-10 py-10 text-center text-red-600">
        <p>Error loading Bracelets: {error}</p>
      </div>
    );
  }

  return (
    <div className="m-10 py-10">
      <CollectionSection title="Bracelets" items={Bracelets} />
    </div>
  );
}
