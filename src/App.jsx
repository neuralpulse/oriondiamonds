import { useState } from "react";
import newImage from "./assets/new.jpg";
import logo from "./assets/logo.jpg";
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-900 antialiased">
      {/* Navbar */}
      <nav className="fixed w-full z-40 top-0 left-0 p-6 flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center h-12">
          <img
            src={logo}
            alt="Orion Logo"
            className="h-full w-auto object-contain"
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 items-center justify-center md:justify-end w-full md:w-auto">
          <a href="#why" className="text-sm hover:text-[#1a3e64]">
            Why Orion
          </a>
          <a href="#compare" className="text-sm hover:text-[#1a3e64]">
            Compare
          </a>
          <a href="#certs" className="text-sm hover:text-[#1a3e64]">
            Certifications
          </a>
          <button className="px-4 py-2 rounded-md bg-[#1a3e64] text-white text-sm">
            Explore
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src={newImage}
            alt="Hero"
            className="w-full h-full object-cover animate-heroZoomOut"
          />

          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Text overlay */}
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight text-[#ffffff]">
            Orion Diamonds
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-[#ffffff]">
            Lab-grown diamonds inspired by the celestial brilliance of the Orion
            constellation — the same composition as mined diamonds, sustainably
            made, and designed for the modern world.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#catalog"
              className="px-8 py-4 rounded-full bg-[#1a3e64] text-white shadow-xl transition-colors duration-300"
            >
              Shop Collection
            </a>
            <a
              href="#certs"
              className="px-8 py-4 rounded-full bg-white text-[#1a3e64] border border-[#1a3e64] shadow transition-colors duration-300 hover:bg-[#1a3e64] hover:text-white"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </header>

      {/* Why Section */}
      <section id="why" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-[#1a3e64]">Why Orion?</h2>
            <p className="mt-4 text-lg text-[#1a3e64]">
              We craft diamonds in controlled lab environments. Orion Diamonds
              are chemically and optically identical to natural diamonds — but
              produced with a fraction of the environmental impact and at an
              accessible price point.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#1a3e64]/10 text-[#1a3e64]">
                Sustainable & Eco-Friendly
              </div>
              <div className="p-6 rounded-2xl bg-[#1a3e64]/10 text-[#1a3e64]">
                Same Brilliance as Natural
              </div>
              <div className="p-6 rounded-2xl bg-[#1a3e64]/10 text-[#1a3e64]">
                Affordable Luxury
              </div>
              <div className="p-6 rounded-2xl bg-[#1a3e64]/10 text-[#1a3e64]">
                Backed by Science
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl bg-[#1a3e64]/10 p-6 shadow-lg">
            <h3 className="font-medium text-5xl text-[#1a3e64]">
              Sustainability Meets Science
            </h3>
            <p className="mt-6 text-[#1a3e64]">
              Orion Diamonds are produced using low-impact processes and strict
              quality control — every stone is graded and hallmarked.
            </p>
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section
        id="compare"
        className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-50"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif text-[#1a3e64]">
            Natural vs Artificial vs Orion
          </h2>
          <p className="mt-3 text-[#1a3e64]">
            A clear comparison so customers can choose with confidence.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-[#1a3e64]/10 p-6 rounded-2xl">
            <h4 className="font-medium text-[#1a3e64]">Natural</h4>
            <ul className="mt-3 text-sm text-[#1a3e64] space-y-2">
              <li>• Mined from earth</li>
              <li>• Highest price / environmental cost</li>
              <li>• Authentic geological origin</li>
            </ul>
          </div>
          <div className="bg-[#1a3e64]/10 p-6 rounded-2xl">
            <h4 className="font-medium text-[#1a3e64]">
              Artificial (CZ / Moissanite)
            </h4>
            <ul className="mt-3 text-sm text-[#1a3e64] space-y-2">
              <li>• Lab-made simulants</li>
              <li>• Lower price, different composition</li>
              <li>• Good sparkle, but not diamond chemistry</li>
            </ul>
          </div>
          <div className="bg-[#1a3e64]/10 p-6 rounded-2xl">
            <h4 className="font-medium text-[#1a3e64]">Orion Lab Diamonds</h4>
            <ul className="mt-3 text-sm text-[#1a3e64] space-y-2">
              <li>• Same chemical composition as natural diamonds</li>
              <li>• Lower ecological footprint</li>
              <li>• Price between simulants and mined stones — great value</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certs" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-[#1a3e64]">
              Hallmarking & Certification
            </h2>
            <p className="mt-4 text-[#1a3e64]">
              Every Orion diamond is independently graded and hallmarked. Upload
              or view certificates to verify cut, color, clarity and carat. We
              display trusted lab logos and provide a unique certificate ID for
              each stone.
            </p>
          </div>
          <div className="rounded-2xl bg-[#1a3e64]/10 p-6">
            <h3 className="font-medium text-[#1a3e64]">Sample Certificate</h3>
            <div className="mt-4 border border-[#1a3e64]/30 rounded-lg p-4">
              <div className="text-sm text-[#1a3e64]">
                Certificate ID:{" "}
                <span className="font-mono">OR-2025-000123</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section
        id="catalog"
        className="py-24 px-6 bg-gradient-to-t from-gray-50 to-transparent"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-[#1a3e64]">
            Ready to explore Orion?
          </h2>
          <p className="mt-3 text-[#1a3e64]">
            Shop responsibly — find the stone that's right for you and comes
            with full certification.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a className="px-8 py-4 rounded-full bg-[#1a3e64] text-white shadow-xl">
              Shop Collection
            </a>
            <a className="px-8 py-4 rounded-full border border-[#1a3e64] text-[#1a3e64] hover:bg-[#1a3e64]/10">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-[#1a3e64] text-sm">
          © {new Date().getFullYear()} Orion Diamonds — All rights reserved
        </div>
      </footer>

      {/* Hero Animation */}
      <style>
        {`
    @keyframes heroZoomOut {
      0% { transform: scale(2 ); }   /* starts zoomed in */
      100% { transform: scale(1.0); } /* ends at normal size */
    }

    .animate-heroZoomOut {
      animation: heroZoomOut 1.5s ease-out forwards;
    }
  `}
      </style>
    </div>
  );
}

export default App;
