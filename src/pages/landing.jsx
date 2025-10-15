import { useState } from "react";
import newImage from "../assets/new.jpg";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import mobhero from "../assets/mobhero.jpg";
export function Landing() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div id="hero" className="min-h-screen text-gray-900 antialiased">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={mobhero}
            alt="Hero Mobile"
            className="block sm:hidden w-full min-h-screen object-cover animate-heroZoomOut"
          />
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
            made, and designed for the modern world
          </p>
        </div>
      </header>

      {/* Collections Section */}
      <section id="collections" className="p-8">
        <h2 className="text-5xl font-semibold mb-6 text-[#0a1833]">
          Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:auto-rows-[200px]">
          {/* Earrings - Large highlight card */}
          <div
            className="relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-lg group h-[200px] md:h-auto"
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
            className="relative md:col-span-2 rounded-2xl overflow-hidden shadow-lg group h-[200px] md:h-auto"
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
            className="relative rounded-2xl overflow-hidden shadow-lg group h-[200px] md:h-auto"
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
            className="relative rounded-2xl overflow-hidden shadow-lg group h-[200px] md:h-auto"
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
        <div className="p-10">
          <section className="max-w-4xl mx-auto text-center">
            <p className="text-[#0a1833] mb-8">
              Create your one-of-a-kind diamond piece with our artisans. Choose
              your design, diamond shape, carat, and setting — we’ll bring your
              vision to life.
            </p>
            <button className="bg-[#0a1833] text-white px-8 py-3 rounded-lg hover:bg-[#142850] transition">
              Start Customizing
            </button>
          </section>
        </div>
      </section>

      {/* Accordion Sections */}
      <section
        id="faqs"
        className="py-15 px-8 bg-gradient-to-t from-gray-50 to-transparent"
      >
        <h2 className="text-4xl font-semibold mb-6 text-[#0a1833]">
          Frequently Asked Questions
        </h2>
        {[
          {
            title: "What are lab-grown diamonds?",
            content: (
              <p className="text-[#0a1833]">
                Lab-grown diamonds are real diamonds created in a lab using
                advanced technology. They have the same physical, chemical, and
                optical properties as mined diamonds.
              </p>
            ),
          },
          {
            title: "Are lab-grown diamonds real diamonds?",
            content: (
              <p className="text-[#0a1833]">
                Yes, lab-grown diamonds are 100% real. They are certified and
                graded just like mined diamonds.
              </p>
            ),
          },
          {
            title: "How are lab-grown diamonds made?",
            content: (
              <p className="text-[#0a1833]">
                They are made using two methods: HPHT (High Pressure High
                Temperature) or CVD (Chemical Vapor Deposition), replicating the
                natural diamond-growing process. We prefer and use the CVD
                method.
              </p>
            ),
          },
          {
            title:
              "Do lab-grown diamonds look different from natural diamonds?",
            content: (
              <p className="text-[#0a1833]">
                Lab-grown diamonds do not hold resale value like mined diamonds.
                They're ideal for value-conscious buyers who prioritize ethics
                and aesthetics.
              </p>
            ),
          },
          {
            title: "Will a lab-grown diamond last forever?",
            content: (
              <p className="text-[#0a1833]">
                Yes. Just like mined diamonds, they are extremely durable and
                will last a lifetime.
              </p>
            ),
          },
          {
            title: "Why should I choose lab-grown over natural diamonds?",
            content: (
              <p className="text-[#0a1833]">
                Lab-grown diamonds offer the same beauty at a better price, with
                ethical sourcing and lower environmental impact.
              </p>
            ),
          },
          {
            title: "Can I customise lab-grown diamond jewellery?",
            content: (
              <p className="text-[#0a1833]">
                Absolutely. At Orion, we craft each piece to match your vision —
                from rings to earrings, every design is tailored to your style
                and preferences.
              </p>
            ),
          },
          {
            title: "Can lab-grown diamonds be certified?",
            content: (
              <p className="text-[#0a1833]">
                Absolutely. They are certified by reputable labs like IGI, GIA,
                or SGL, just like mined diamonds.
              </p>
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
              <div className="px-6 py-6 text-[#0a1833]">{section.content}</div>
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
