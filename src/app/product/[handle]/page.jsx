import { shopifyRequest } from "../../../utils/shopify";
import { GET_PRODUCT_BY_HANDLE } from "../../../queries/products";
import ProductDetailsClient from "./ProductDetailsClient";

export async function generateMetadata({ params }) {
  const { handle } = await params; // ← Add this await

  const response = await shopifyRequest(GET_PRODUCT_BY_HANDLE, { handle });
  const product = response?.data?.product;

  if (!product) {
    return {
      title: "Orion Diamonds",
      description: "Premium diamond jewellery",
    };
  }

  const imageUrl =
    product?.featuredImage?.url ||
    product?.images?.edges?.[0]?.node?.url ||
    "/icon.jpeg";

  return {
    title: `${product.title} – Orion Diamonds`,
    description: product.description?.slice(0, 150) || "",
    openGraph: {
      title: `${product.title} – Orion Diamonds`,
      description: product.description?.slice(0, 150) || "",
      url: `https://oriondiamonds.in/product/${handle}`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} – Orion Diamonds`,
      description: product.description?.slice(0, 150),
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  return <ProductDetailsClient handle={handle} />;
}
