// app/earrings/page.jsx
import CollectionSection from "../../components/collectionsect";
import { shopifyRequest } from "../../utils/shopify";
import { GET_EARRINGS_COLLECTION } from "../../queries/earrings_collection";
import { calculateFinalPrice } from "../../utils/price";

// Cache for 1 hour
export const revalidate = 3600;

async function calculateProductPrice(description, selectedKarat = "10K") {
  try {
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

    const diamonds = diamondShapes.map((shape, i) => ({
      shape,
      weight: diamondWeights[i] || 0,
      count: diamondCounts[i] || 0,
    }));

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

async function transformEarringsData(productsEdges) {
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

      const calculatedPrice = await calculateProductPrice(
        product.description,
        "10K"
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

  // Sort: Studs first, then Hoops
  return transformedProducts.sort((a, b) => {
    const titleA = a.name.toLowerCase();
    const titleB = b.name.toLowerCase();

    const aHasStuds = titleA.includes("studs");
    const bHasStuds = titleB.includes("studs");
    const aHasHoops = titleA.includes("hoops");
    const bHasHoops = titleB.includes("hoops");

    if (aHasStuds && !bHasStuds) return -1;
    if (!aHasStuds && bHasStuds) return 1;
    if (aHasHoops && !bHasHoops) return -1;
    if (!aHasHoops && bHasHoops) return 1;

    return 0;
  });
}

export default async function EarringsPage() {
  try {
    const response = await shopifyRequest(GET_EARRINGS_COLLECTION);

    if (!response.data?.collection?.products?.edges) {
      return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 text-center text-red-600">
          <p>No earrings found.</p>
        </div>
      );
    }

    const earrings = await transformEarringsData(
      response.data.collection.products.edges
    );

    return (
      <div className="container mx-auto px-3 md:px-6 lg:px-8 py-10 md:py-25">
        <CollectionSection
          id="earrings-collection"
          title="Earrings"
          items={earrings}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching earrings:", error);
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 text-center text-red-600">
        <p>Error loading Earrings: {error.message}</p>
      </div>
    );
  }
}
