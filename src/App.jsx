import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/landing";
import ProductDetails from "./pages/prod_desc";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

function App() {
  return (
    <BrowserRouter basename="/oriondiamonds">
      <Navbar />
      <div className="pt-20"></div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
