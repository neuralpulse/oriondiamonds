import first from "../assets/1.png";
import second from "../assets/2.png";
import third from "../assets/3.png";
import CollectionSection from "../components/collectionsect";

export function Necklaces() {
  const necklaces = [
    {
      productCode: "ODNK001",
      name: "Luna Drop Diamond Necklace",
      gold: "5.2 gm",
      diamondPrice: "120000",
      diamondDetails: "FG VS, 35 Stones",
      price: "₹120000",
      image: first,
    },
    {
      productCode: "ODNK002",
      name: "Ethereal Cluster Pendant Necklace",
      gold: "4.8 gm",
      diamondPrice: "95000",
      diamondDetails: "EF VVS, 24 Stones",
      price: "₹95000",
      image: second,
    },
    {
      productCode: "ODNK003",
      name: "Celeste Solitaire Necklace",
      gold: "3.9 gm",
      diamondPrice: "110000",
      diamondDetails: "EF VS1, 1 Stone",
      price: "₹110000",
      image: third,
    },
  ];

  return (
    <div className="m-10 py-10">
      <CollectionSection title="Necklaces" items={necklaces} />
    </div>
  );
}
