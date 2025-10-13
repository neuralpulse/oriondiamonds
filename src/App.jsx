import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/landing";
import ProductDetails from "./pages/prod_desc";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Earrings } from "./pages/Earrings";
import ScrollToTop from "./components/scrolltop";
import { Rings } from "./pages/rings";
import { Bracelets } from "./pages/bracelets";
import { Necklaces } from "./pages/necklaces";
import { Cart } from "./pages/cart";
import { Wishlist } from "./pages/wishlist";
import { NotFound } from "./pages/notfound";
import SearchResults from "./pages/SearchResults";
function App() {
  return (
    <BrowserRouter basename="/oriondiamonds/">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/:handle" element={<ProductDetails />} />
        <Route path="/earrings" element={<Earrings />} />
        <Route path="/rings" element={<Rings />} />
        <Route path="/bracelets" element={<Bracelets />} />
        <Route path="/pendants" element={<Necklaces />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/my-list" element={<Wishlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
