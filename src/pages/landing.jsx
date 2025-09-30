import { useState } from "react";
import newImage from "../assets/new.jpg";
import { FiMenu } from "react-icons/fi";
import first from "../assets/1.png";
import second from "../assets/2.png";
import third from "../assets/3.png";
import CollectionSection from "../components/collectionsect";
import { Footer } from "../components/footer";

export function Landing() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const rings = [
    {
      productCode: "ODRGHC001",
      name: "Harmony Curve Diamond Contour Band",
      gold: "1.984 gram",
      diamondPrice: "30000",
      diamondDetails: "FG VS Round, No. of D- 7",
      price: "50000",
      image: first,
    },
    {
      productCode: "ODRGEB002",
      name: "The Eternal Blossom Ring",
      grossGold: "2.282 gm",
      gold: "2.200 gm",
      diamondPrice: "60000",
      diamondDetails: "EF VVS VS Round, No. of D- 1, No. of D- 17",
      price: "$600",
      image: second,
    },
    {
      productCode: "ODRGCC003",
      name: "The Criss-Cross Harmony Ring",
      grossGold: "2.388 gm",
      gold: "2.360 gm",
      diamondPrice: "50000",
      diamondDetails: "EF VVS to VS Round, No. of D- 16, No. of D- 3",
      price: "$700",
      image: third,
    },
  ];
  const earrings = [];
  const pendents = [];
  const bracelets = [];

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div id="hero" className="min-h-screen text-gray-900 antialiased">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={newImage}
            alt="Hero"
            className="w-full min-h-screen object-cover animate-heroZoomOut"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div
          className="relative z-10 max-w-4xl text-center px-6"
          style={{ transform: "translateY(-2.5rem)" }} // shift up by navbar height (h-20 = 5rem)
        >
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
        <h2 className="text-5xl font-semibold mb-6 text-[#0a1833]">
          Collections
        </h2>

        <CollectionSection id="rings" title="Rings" items={rings} />
        <CollectionSection id="earrings" title="Earrings" items={earrings} />
        <CollectionSection id="pendents" title="Pendants" items={pendents} />
        <CollectionSection id="bracelets" title="Bracelets" items={bracelets} />
      </section>

      {/* Accordion Sections */}
      <section className="py-15 px-6 bg-gradient-to-t from-gray-50 to-transparent">
        <h1 className="text-4xl font-serif text-[#0a1833] text-center mb-12">
          Frequently Asked Questions
        </h1>
        {[
          {
            title: "Why Orion?",
            content: (
              <>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center pt-3 pb-15">
                  <div>
                    <p className="mt-4 text-lg text-[#0a1833]">
                      We craft diamonds in controlled lab environments. Orion
                      Diamonds are chemically and optically identical to natural
                      diamonds — but produced with a fraction of the
                      environmental impact and at an accessible price point.
                    </p>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-[#0a1833]/10 text-[#0a1833]">
                        Sustainable & Eco-Friendly
                      </div>
                      <div className="p-6 rounded-2xl bg-[#0a1833]/10 text-[#0a1833]">
                        Same Brilliance as Natural
                      </div>
                      <div className="p-6 rounded-2xl bg-[#0a1833]/10 text-[#0a1833]">
                        Affordable Luxury
                      </div>
                      <div className="p-6 rounded-2xl bg-[#0a1833]/10 text-[#0a1833]">
                        Backed by Science
                      </div>
                    </div>
                  </div>
                  <div className="relative h-80 rounded-2xl bg-[#0a1833]/10 p-6 shadow-lg">
                    <h3 className="font-medium text-5xl text-[#0a1833]">
                      Sustainability Meets Science
                    </h3>
                    <p className="mt-6 text-[#0a1833]">
                      Orion Diamonds are produced using low-impact processes and
                      strict quality control — every stone is graded and
                      hallmarked.
                    </p>
                  </div>
                </div>
              </>
            ),
          },
          {
            title: "Natural vs Artificial vs Orion",
            content: (
              <>
                <div className="max-w-6xl mx-auto text-center mb-12 pt-3">
                  <p className="mt-3 text-[#0a1833]">
                    A clear comparison so customers can choose with confidence.
                  </p>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 pb-15">
                  <div className="bg-[#0a1833]/10 p-6 rounded-2xl">
                    <h4 className="font-medium text-[#0a1833]">Natural</h4>
                    <ul className="mt-3 text-sm text-[#0a1833] space-y-2">
                      <li>• Mined from earth</li>
                      <li>• Highest price / environmental cost</li>
                      <li>• Authentic geological origin</li>
                    </ul>
                  </div>
                  <div className="bg-[#0a1833]/10 p-6 rounded-2xl">
                    <h4 className="font-medium text-[#0a1833]">
                      Artificial (CZ / Moissanite)
                    </h4>
                    <ul className="mt-3 text-sm text-[#0a1833] space-y-2">
                      <li>• Lab-made simulants</li>
                      <li>• Lower price, different composition</li>
                      <li>• Good sparkle, but not diamond chemistry</li>
                    </ul>
                  </div>
                  <div className="bg-[#0a1833]/10 p-6 rounded-2xl">
                    <h4 className="font-medium text-[#0a1833]">
                      Orion Lab Diamonds
                    </h4>
                    <ul className="mt-3 text-sm text-[#0a1833] space-y-2">
                      <li>• Same chemical composition as natural diamonds</li>
                      <li>• Lower ecological footprint</li>
                      <li>
                        • Price between simulants and mined stones — great value
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ),
          },
          {
            title: "Hallmarking & Certification",
            content: (
              <>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center pt-3 pb-15">
                  <div>
                    <p className="mt-4 text-[#0a1833]">
                      Every Orion diamond is independently graded and
                      hallmarked. Upload or view certificates to verify cut,
                      color, clarity and carat. We display trusted lab logos and
                      provide a unique certificate ID for each stone.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#0a1833]/10 p-6">
                    <h3 className="font-medium text-[#0a1833]">
                      Sample Certificate
                    </h3>
                    <div className="mt-4 border border-[#0a1833]/30 rounded-lg p-4">
                      <div className="text-sm text-[#0a1833]">
                        Certificate ID:{" "}
                        <span className="font-mono">OR-2025-000123</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ),
          },
        ].map((section, idx) => (
          <div key={idx} className="border-b">
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left text-[#0a1833] font-semibold hover:bg-[#0a1833]/10"
              onClick={() => toggleAccordion(idx)}
            >
              {section.title}
              <FiMenu />
            </button>
            {activeAccordion === idx && (
              <div className="px-6 py-4 text-[#0a1833]">{section.content}</div>
            )}
          </div>
        ))}
      </section>
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
