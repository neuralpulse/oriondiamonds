// Remove "use client" - this is now a Server Component
import CollectionSection from "../../components/collectionsect";
import { shopifyRequest } from "../../utils/shopify";
import { GET_BRACELETS_COLLECTION } from "../../queries/bracelets_collection";
import { calculateFinalPrice } from "../../utils/price";

// Cache for 1 hour (3600 seconds)
export const revalidate = 3600;

async function calculateProductPrice(description, selectedKarat = "10K") {
  try {
    // Improved regex to capture multiple diamond types including "Marquese"
    const diamondShapeMatch = description.match(
      /Diamond Shape:\s*([A-Za-z,\s]+?)(?=Total Diamonds|Diamond Weight|$)/i
    );
    const totalDiamondsMatch = description.match(
      /Total Diamonds:\s*([\d,\s]+?)(?=Diamond Weight|Total Diamond Weight|Metal Weights|$)/i
    );
    const diamondWeightMatch = description.match(
      /Diamond Weight:\s*([\d.,\s]+?)(?=Total Diamond Weight|Metal Weights|$)/i
    );
    const goldWeightMatch = description.match(
      new RegExp(`${selectedKarat} Gold:\\s*([\\d.]+)g`, "i")
    );

    // Clean up captured groups
    const diamondShapes = diamondShapeMatch
      ? diamondShapeMatch[1]
          .trim()
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s)
      : [];

    const diamondCounts = totalDiamondsMatch
      ? totalDiamondsMatch[1]
          .trim()
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s && !isNaN(s))
          .map((c) => parseInt(c))
      : [];

    const diamondWeights = diamondWeightMatch
      ? diamondWeightMatch[1]
          .trim()
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s && !isNaN(s))
          .map((w) => parseFloat(w))
      : [];

    const goldWeight = goldWeightMatch ? parseFloat(goldWeightMatch[1]) : 0;

    console.log(
      "Extracted - Shapes:",
      diamondShapes,
      "Counts:",
      diamondCounts,
      "Weights:",
      diamondWeights,
      "Gold:",
      goldWeight
    );

    const diamonds = diamondShapes.map((shape, i) => ({
      shape,
      weight: diamondWeights[i] || 0,
      count: diamondCounts[i] || 0,
    }));

    // Calculate price using 10K as default for collection display
    const result = await calculateFinalPrice({
      diamonds,
      goldWeight,
      goldKarat: selectedKarat,
    });

    return result.totalPrice;
  } catch (error) {
    console.error("Error calculating price:", error);
    return 0;
  }
}

function extractDiamondDetails(description) {
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
}

async function transformBraceletsData(productsEdges) {
  const transformedProducts = await Promise.all(
    productsEdges.map(async ({ node: product }) => {
      const firstVariant = product.variants.edges[0]?.node;

      const goldKarat =
        firstVariant?.selectedOptions.find((opt) => opt.name === "Gold Karat")
          ?.value || "18K";

      const goldColor =
        firstVariant?.selectedOptions.find((opt) => opt.name === "Gold Color")
          ?.value || "";

      const diamondGrade =
        firstVariant?.selectedOptions.find(
          (opt) => opt.name === "Diamond Grade"
        )?.value || "";

      const diamondDetails = extractDiamondDetails(product.description);

      // Calculate actual price using your pricing logic
      const calculatedPrice = await calculateProductPrice(
        product.description,
        "10K" // Always use 10K for collection display
      );

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
        price: calculatedPrice,
        currency: firstVariant?.price.currencyCode || "INR",
        image: product.featuredImage?.url || firstVariant?.image?.url || "",
        images:
          product.images?.edges?.map((img) => ({
            url: img.node.url,
            altText: img.node.altText,
          })) || [],
        allVariants: product.variants.edges.map((v) => v.node),
      };
    })
  );

  return transformedProducts;
}

export default async function BraceletsPage() {
  try {
    const response = await shopifyRequest(GET_BRACELETS_COLLECTION);

    if (!response.data?.collection?.products?.edges) {
      return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 text-center text-red-600">
          <p>No bracelets found.</p>
        </div>
      );
    }

    const bracelets = await transformBraceletsData(
      response.data.collection.products.edges
    );

    return (
      <div className="container mx-auto px-3 md:px-6 lg:px-8 py-10 md:py-25">
        <CollectionSection
          id="bracelets-collection"
          title="Bracelets"
          items={bracelets}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching bracelets:", error);
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 text-center text-red-600">
        <p>Error loading Bracelets: {error.message}</p>
      </div>
    );
  }
}
