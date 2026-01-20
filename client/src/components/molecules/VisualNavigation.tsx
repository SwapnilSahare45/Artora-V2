import Image from "next/image";
import Link from "next/link";

const VisualNavigation = () => {
  const categories = [
    { name: "Painting", image: "/abstract.webp" },
    { name: "Digital Art", image: "/digitalart.webp" },
    { name: "Photography", image: "/photography.webp" },
    { name: "Landscape", image: "/traditional.webp" },
  ];

  return (
    <section className="max-w-7xl mx-auto md:py-24 px-6">
      <div className="flex justify-between items-end mb-12 border-b border-glass pb-8">
        <h2 id="exhibition-heading" className="text-4xl font-luxury">
          Browse by <span className="italic text-brand">Exhibition</span>
        </h2>
        <p className="text-dim font-jakarta text-[10px] uppercase tracking-widest">
          Four distinct realms
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((nav, idx) => (
          <Link
            href={`/artworks?category=${nav.name}`}
            key={idx}
            className="group relative h-100 overflow-hidden border border-glass"
          >
            <Image
              src={nav.image}
              alt=""
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center p-6 border border-white/0 group-hover:border-glass transition-all">
              <h3 className="text-sm font-jakarta font-bold tracking-[0.4em] uppercase">
                {nav.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default VisualNavigation;
