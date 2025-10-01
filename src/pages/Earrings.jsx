import CollectionSection from "../components/collectionsect";
import first from "../assets/1.png";
import second from "../assets/2.png";
import third from "../assets/3.png";
export function Earrings() {
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
  return (
    <div>
      <section id="earrings" className="m-10 py-15">
        <CollectionSection title="Earrings" items={rings} />
      </section>
    </div>
  );
}
