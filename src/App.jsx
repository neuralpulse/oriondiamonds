import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/landing";
import ProductDetails from "./pages/prod_desc";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Earrings } from "./pages/Earrings";
import ScrollToTop from "./components/scrolltop";

function App() {
  return (
    <BrowserRouter basename="/oriondiamonds/">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/earrings" element={<Earrings />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
