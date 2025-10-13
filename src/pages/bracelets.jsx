import first from "../assets/1.png";
import second from "../assets/2.png";
import third from "../assets/3.png";
import CollectionSection from "../components/collectionsect";

export function Bracelets() {
  const bracelets = [
    {
      productCode: "ODBR001",
      name: "Celestial Chain Diamond Bracelet",
      gold: "4.2 gm",
      diamondPrice: "68000",
      diamondDetails: "EF VS, 18 Stones",
      price: "₹68000",
      image: first,
    },
    {
      productCode: "ODBR002",
      name: "Radiant Bangle Diamond Bracelet",
      gold: "5.1 gm",
      diamondPrice: "92000",
      diamondDetails: "FG VVS, 22 Stones",
      price: "₹92000",
      image: second,
    },
    {
      productCode: "ODBR003",
      name: "Aurora Twirl Diamond Bracelet",
      gold: "4.6 gm",
      diamondPrice: "81000",
      diamondDetails: "EF VS1, 15 Stones",
      price: "₹81000",
      image: third,
    },
  ];

  return (
    <div className="m-10 py-10">
      <CollectionSection title="Bracelets" items={bracelets} />
    </div>
  );
}
