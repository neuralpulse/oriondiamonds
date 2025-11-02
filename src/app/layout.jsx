"use client";

import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import ScrollToTop from "../components/scrolltop";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <Navbar />
        <Toaster position="bottom-center" />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
