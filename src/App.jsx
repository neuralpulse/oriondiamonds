import { useState } from "react";
import newImage from "./assets/new.jpg";
import logo from "./assets/logo.jpg";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import first from "./assets/1.png";
import second from "./assets/2.png";
import third from "./assets/3.png";

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);

  const collections = [
    {
      productCode: "ODRGHC001",
      name: "Harmony Curve Diamond Contour Band",
      gold: "1.984 gram",
      diamondPrice: "0.01 to 0.07",
      diamondDetails: "FG VS Round, No. of D- 7",
      image: first,
    },
    {
      productCode: "ODRGEB002",
      name: "The Eternal Blossom Ring",
      grossGold: "2.282 gm",
      gold: "2.200 gm",
      diamondPrice: "0.18 to 0.22 (0.210gm), 0.01 to 0.07 (0.200gm)",
      diamondDetails: "EF VVS VS Round, No. of D- 1, No. of D- 17",
      image: second,
    },
    {
      productCode: "ODRGCC003",
      name: "The Criss-Cross Harmony Ring",
      grossGold: "2.388 gm",
      gold: "2.360 gm",
      diamondPrice: "plus minus 0.00 size (0.060gm), 0.01 to 0.07 (0.080gm)",
      diamondDetails: "EF VVS to VS Round, No. of D- 16, No. of D- 3",
      image: third,
    },
  ];

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen text-gray-900 antialiased">
      {/* Navbar */}
      <nav className="fixed w-full z-40 top-0 left-0 p-4 flex items-center justify-between bg-[#1a3e64]/60 backdrop-blur-sm shadow-sm">
        {/* Search */}
        <div className="flex items-center gap-4">
          <FiSearch
            size={24}
            className="text-white cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 outline-none text-white rounded-2xl"
            />
          )}
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} alt="Logo" className="h-14 w-auto object-contain" />
        </div>

        {/* Icons */}
        {/* Icons */}
        <div className="flex items-center gap-4">
          <FiShoppingCart
            size={24}
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-yellow-400"
          />
          <FiHeart
            size={24}
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-500"
          />
          <FiUser
            size={24}
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-green-400"
          />
        </div>
      </nav>
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={newImage}
            alt="Hero"
            className="w-full h-full object-cover animate-heroZoomOut"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight text-[#ffffff]">
            Orion Diamonds
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-[#ffffff]">
            Lab-grown diamonds inspired by the celestial brilliance of the Orion
            constellation — chemically identical to mined diamonds, sustainably
            made, and designed for the modern world.
          </p>
        </div>
      </header>
      {/* Collections Section */}
      <section className="p-8">
        <h2 className="text-5xl font-semibold mb-6 text-[#1a3e64]">
          Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-md p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-contain rounded-md"
              />
              <h3 className="font-medium text-[#1a3e64]">{item.name}</h3>
              <p className="text-sm">Code: {item.productCode}</p>
              <p className="text-sm">Gold: {item.gold}</p>
              <p className="text-sm">Diamond: {item.diamondDetails}</p>
              <p className="text-sm font-semibold">
                Price: {item.diamondPrice}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Accordion Sections */}
      <section className="py-15 px-6 bg-gradient-to-t from-gray-50 to-transparent">
        <h1 className="text-4xl font-serif text-[#1a3e64] text-center mb-12">
          Frequently Asked Questions
        </h1>
        {[
          {
            title: "Why Orion?",
            content: (
              <>
                <section className="py-20 px-6 bg-gray-50">
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl font-serif text-[#1a3e64]">
                        Why Orion?
                      </h2>
                      <p className="mt-4 text-lg text-[#1a3e64]">
                        We craft diamonds in controlled lab environments. Orion
                        Diamonds are chemically and optically identical to
                        natural diamonds — but produced with a fraction of the
                        environmental impact and at an accessible price point.
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
                        Orion Diamonds are produced using low-impact processes
                        and strict quality control — every stone is graded and
                        hallmarked.
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ),
          },
          {
            title: "Natural vs Artificial vs Orion",
            content: (
              <>
                <section
                  id="compare"
                  className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-50"
                >
                  <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-serif text-[#1a3e64]">
                      Natural vs Artificial vs Orion
                    </h2>
                    <p className="mt-3 text-[#1a3e64]">
                      A clear comparison so customers can choose with
                      confidence.
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
                      <h4 className="font-medium text-[#1a3e64]">
                        Orion Lab Diamonds
                      </h4>
                      <ul className="mt-3 text-sm text-[#1a3e64] space-y-2">
                        <li>• Same chemical composition as natural diamonds</li>
                        <li>• Lower ecological footprint</li>
                        <li>
                          • Price between simulants and mined stones — great
                          value
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            ),
          },
          {
            title: "Hallmarking & Certification",
            content: (
              <>
                <section id="certs" className="py-20 px-6 bg-gray-50">
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl font-serif text-[#1a3e64]">
                        Hallmarking & Certification
                      </h2>
                      <p className="mt-4 text-[#1a3e64]">
                        Every Orion diamond is independently graded and
                        hallmarked. Upload or view certificates to verify cut,
                        color, clarity and carat. We display trusted lab logos
                        and provide a unique certificate ID for each stone.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#1a3e64]/10 p-6">
                      <h3 className="font-medium text-[#1a3e64]">
                        Sample Certificate
                      </h3>
                      <div className="mt-4 border border-[#1a3e64]/30 rounded-lg p-4">
                        <div className="text-sm text-[#1a3e64]">
                          Certificate ID:{" "}
                          <span className="font-mono">OR-2025-000123</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            ),
          },
        ].map((section, idx) => (
          <div key={idx} className="border-b">
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left text-[#1a3e64] font-semibold hover:bg-[#1a3e64]/10"
              onClick={() => toggleAccordion(idx)}
            >
              {section.title}
              <FiMenu />
            </button>
            {activeAccordion === idx && (
              <div className="px-6 py-4 text-[#1a3e64]">{section.content}</div>
            )}
          </div>
        ))}
      </section>
      {/* Contact Section */}
      <section className="py-24 px-6 bg-gradient-to-t from-gray-50 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-[#1a3e64]">Contact Us</h2>
          <p className="mt-3 text-[#1a3e64]">
            Have questions or want to know more? Reach out to us anytime.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <span>
              Email:{" "}
              <a href="mailto:orionmail@example.com" className="underline">
                orionmail@example.com
              </a>
            </span>
            <span>
              Phone:{" "}
              <a href="tel:+801919119921" className="underline">
                +80 19191 19921
              </a>
            </span>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-[#1a3e64] text-sm">
          © {new Date().getFullYear()} Orion Diamonds — All rights reserved
        </div>
      </footer>
      <style>
        {`
          @keyframes heroZoomOut {
            0% { transform: scale(2 ); }
            100% { transform: scale(1.0); }
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
