"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const AdminPricingPortal = dynamic(
  () => import("../../../components/AdminPricingPage.jsx"),
  {
    ssr: false,
  }
);

export default function AdminPricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <AdminPricingPortal />
    </Suspense>
  );
}
