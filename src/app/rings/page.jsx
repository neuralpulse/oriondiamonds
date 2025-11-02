// app/rings/page.jsx
import CollectionSection from "../../components/collectionsect";
import { shopifyRequest } from "../../utils/shopify";
import { GET_RINGS_COLLECTION } from "../../queries/collections";

export const dynamic = "force-dynamic"; // ensures fresh data

export default async function RingsPage() {
  const response = await shopifyRequest(GET_RINGS_COLLECTION);
  const products = response.data?.collection?.products?.edges || [];
  const rings = transformRingsData(products);

  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-8 py-10 md:py-25">
      <CollectionSection title="Rings" items={rings} />
    </div>
  );
}

function transformRingsData(productsEdges) {
  return productsEdges.map(({ node: product }) => {
    const firstVariant = product.variants.edges[0]?.node;

    const goldKarat =
      firstVariant?.selectedOptions.find((opt) => opt.name === "Gold Karat")
        ?.value || "";

    const goldColor =
      firstVariant?.selectedOptions.find((opt) => opt.name === "Gold Color")
        ?.value || "";

    const diamondGrade =
      firstVariant?.selectedOptions.find((opt) => opt.name === "Diamond Grade")
        ?.value || "";

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
      allVariants: product.variants.edges.map((v) => v.node),
    };
  });
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
