export default function CollectionSection({ id, title, items }) {
  return (
    <section className="mt-12">
      <h1 id={id} className="text-3xl font-semibold mb-6 text-[#1a3e64]">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items && items.length > 0 ? (
          items.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              {/* Overlay text */}
              <div className="bg-white bg-opacity-50 w-full text-black p-4">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="font-semibold">Price: {item.diamondPrice}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#1a3e64]">No products available.</p>
        )}
      </div>
    </section>
  );
}
