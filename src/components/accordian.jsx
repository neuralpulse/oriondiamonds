import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function ProductSpecs({ descriptionHtml, children }) {
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    if (descriptionHtml) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(descriptionHtml, "text/html");

      const liElements = doc.querySelectorAll(".product-description ul li");

      const parsedSpecs = Array.from(liElements)
        .map((li) => {
          const key = li
            .querySelector("strong")
            ?.textContent.replace(":", "")
            .trim();
          const value = li.textContent
            .replace(li.querySelector("strong")?.textContent || "", "")
            .trim();
          return { key, value };
        })
        .filter(
          (spec) =>
            spec.key &&
            ![
              "Gold Purity",
              "Gold Color",
              "Diamond Quality",
              "Gold Weight",
            ].includes(spec.key)
        );

      setSpecs(parsedSpecs);
    }
  }, [descriptionHtml]);

  return (
    <div>
      {specs.length > 0 && (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200">
            {specs.map((spec) => (
              <tr
                key={spec.key}
                className="hover:bg-white/50 transition-colors"
              >
                <td className="py-3 font-semibold text-gray-800 w-1/3">
                  {spec.key}
                </td>
                <td className="py-3 text-gray-700">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {children}
    </div>
  );
}

export default function ProductAccordion({
  product,
  selectedOptions,
  selectedVariant,
}) {
  const [openTab, setOpenTab] = useState(null);

  const tabs = [
    {
      key: "description",
      label: "DESCRIPTION",
      content:
        "These exquisite set feature premium quality diamonds set in your choice of gold karat, gold color, and diamond grade.",
    },
    {
      key: "specifications",
      label: "PRODUCT DETAILS",
      content: product.descriptionHtml ? (
        <div className="space-y-6">
          <ProductSpecs descriptionHtml={product.descriptionHtml} />
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-200">
              {product.options.map((opt) => (
                <tr
                  key={opt.name}
                  className="hover:bg-white/50 transition-colors"
                >
                  <td className="py-3 font-semibold text-gray-800 w-1/3">
                    {opt.name}
                  </td>
                  <td className="py-3 text-gray-700">
                    {selectedOptions[opt.name]}
                  </td>
                </tr>
              ))}
              <tr className="hover:bg-white/50 transition-colors">
                <td className="py-3 font-semibold text-gray-800 w-1/3">
                  Product Weight
                </td>
                <td className="py-3 text-gray-700">
                  {selectedVariant?.weight
                    ? `${selectedVariant.weight} ${
                        selectedVariant.weightUnit?.toLowerCase() || ""
                      }`
                    : "Not specified"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        "No description available"
      ),
    },
    {
      key: "prices",
      label: "PRICE BREAKUP",
      content: <p className="text-gray-600">Price Breakup coming soon...</p>,
    },
    {
      key: "shipping",
      label: "PAYMENT & SHIPPING",
      content: (
        <div className="space-y-2">
          <p className="text-gray-700 font-medium">✓ Free shipping worldwide</p>
          <p className="text-gray-600">Delivery in 5-7 business days</p>
        </div>
      ),
    },
  ];

  const toggleTab = (key) => {
    setOpenTab(openTab === key ? null : key);
  };

  return (
    <div className="mt-10 border border-gray-200 rounded-xl overflow-hidden">
      {tabs.map((tab, index) => (
        <div
          key={tab.key}
          className={index !== 0 ? "border-t border-gray-200" : ""}
        >
          <button
            className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200 group"
            onClick={() => toggleTab(tab.key)}
          >
            <span className="text-sm tracking-wide">{tab.label}</span>
            <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
              {openTab === tab.key ? (
                <ChevronUp size={20} className="stroke-2" />
              ) : (
                <ChevronDown size={20} className="stroke-2" />
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openTab === tab.key
                ? "max-h-[800px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-5 text-gray-600 text-sm leading-relaxed bg-gray-50">
              {tab.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
