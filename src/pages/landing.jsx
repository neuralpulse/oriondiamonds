import { useState } from "react";
import newImage from "../assets/new.jpg";
import { FiMenu } from "react-icons/fi";
import CollectionSection from "../components/collectionsect";
import { Navigate, useNavigate } from "react-router-dom";

export function Landing() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const navigate = useNavigate();

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
      <section id="collections" className="p-8">
        <h2 className="text-5xl font-semibold mb-6 text-[#0a1833]">
          Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 auto-rows-[200px]">
          {/* Earrings - Large highlight card */}
          <div
            className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg group"
            onClick={() => {
              navigate("/earrings");
            }}
          >
            <img
              src="https://estailofashion.com/cdn/shop/files/151_8_a7f5d752-ca96-4a85-b699-50d51e5a4eb8.jpg?v=1751061678&width=1080"
              alt="Earrings"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-3xl font-bold text-white">Earrings</h3>
            </div>
          </div>

          {/* Pendants */}
          <div
            className="relative col-span-2 rounded-2xl overflow-hidden shadow-lg group"
            onClick={() => {
              navigate("/pendants");
            }}
          >
            <img
              src="https://media.istockphoto.com/id/1355399132/photo/model-showing-her-beautiful-necklace-with-diamond-pendant.jpg?s=612x612&w=0&k=20&c=o3C3atmDtQZGoq-czoyrHVz4abSJhI6BXOXvF4mF3CE="
              alt="Pendants"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-semibold text-white">Pendants</h3>
            </div>
          </div>

          {/* Bracelets */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg group"
            onClick={() => {
              navigate("/bracelets");
            }}
          >
            <img
              src="https://www.shutterstock.com/image-photo/beautiful-model-wearing-white-gold-600nw-2347146685.jpg"
              alt="Bracelets"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-semibold text-white">Bracelets</h3>
            </div>
          </div>

          {/* Rings */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg group"
            onClick={() => {
              navigate("/rings");
            }}
          >
            <img
              src="https://img.freepik.com/free-photo/beautiful-engagement-ring-with-diamonds_23-2149509234.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Rings"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-semibold text-white">Rings</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="p-8 bg-gray-50">
        <h2 className="text-4xl font-semibold mb-6 text-[#0a1833]">About Us</h2>
        <p className="max-w-4xl text-[#0a1833]">
          Orion Diamonds was founded with a vision to create sustainable,
          lab-grown diamonds... (add about owners here).
        </p>
      </section>

      {/* Learn Section */}
      <section id="learn" className="p-8">
        <h2 className="text-4xl font-semibold mb-6 text-[#0a1833]">Learn</h2>
        <p className="text-[#0a1833]">
          Artificial diamonds vs lab-grown: what makes Orion different...
        </p>
      </section>

      {/* Taking Care */}
      <section id="care" className="p-8 bg-gray-50">
        <h2 className="text-4xl font-semibold mb-6 text-[#0a1833]">
          Taking Care of Diamonds
        </h2>
        <p className="text-[#0a1833]">
          To maintain the brilliance and longevity of your Orion Diamonds
          jewellery, follow these simple care tips: Store: Keep your jewellery
          in a soft pouch or a lined box to prevent scratches. Clean: Use a soft
          brush and mild soap to gently clean your diamonds. Avoid: Remove your
          jewellery before swimming, exercising, or handling harsh chemicals.
          Professional Service: We recommend an annual professional cleaning and
          inspection.
        </p>
      </section>

      {/* Customizations */}
      <section id="customizations" className="p-8">
        <h2 className="text-4xl font-semibold mb-6 text-[#0a1833]">
          Customization Process
        </h2>
        <p className="text-[#0a1833]">
          Work with our artisans to design your perfect piece...
        </p>
      </section>

      {/* Accordion Sections */}
      <section
        id="faqs"
        className="py-15 px-6 bg-gradient-to-t from-gray-50 to-transparent"
      >
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
