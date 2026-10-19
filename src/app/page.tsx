import Link from "next/link";
import { getAllCategories, getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  const allCategories = getAllCategories();
  const getIconForCategory = (catName: string) => {
    const normalized = catName.toLowerCase();
    if (normalized.includes("screwdriver")) return "construction";
    if (normalized.includes("chisel")) return "content_cut";
    if (normalized.includes("hammer")) return "hardware";
    if (normalized.includes("bar") || normalized.includes("pry")) return "electric_bolt";
    return "handyman"; // Generic fallback icon
  };

  const categories = allCategories.map((cat) => ({
    name: cat.name,
    icon: getIconForCategory(cat.name),
    path: `/products?category=${encodeURIComponent(cat.name)}`,
  }));


  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden border-b border-[#C8A04B]/20">
        <div className="absolute inset-0 bg-[#000000]/70 z-10"></div>
        {/* We use a high quality industrial background image */}
        <img
          alt="Premium Industrial Hand Tools Background"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPwtW3ssgcq43o40RCCt7dMTeZyhVpCqScmcXymLQahuaqRQgOaU3F-Sp6fTc84JZYdYNghL9HxTXgwe1xUtN7figR9GmC6u3RiHMjg03j4L7-5afVmKkkuemo56jy4bZIr9Z6BFK1mw7k3kQ6-su6TX4O7f437k6i2QDkb2xtjL5mNsz5x-6DRWbl9OZQiNGgUkJMFNCaT9_52ZEEA2Cs7tPCt79G7tT2DEXsUgKL7T9YULr1WJfH_M-TSDy-Hg9np0UYL9RokyiF"
        />
        <div className="relative z-20 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto w-full">
          <p className="text-[#C8A04B] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-heading">
            Uncompromising Quality
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-none mb-8 font-heading">
            Tools Built <br />
            <span className="text-[#C8A04B] relative inline-block">
              To Last
              <span className="absolute bottom-1 left-0 w-full h-1 bg-[#C8A04B]"></span>
            </span>
          </h1>
          <p className="text-[#CFCFCF] text-sm sm:text-base lg:text-lg mb-8 max-w-md leading-relaxed">
            Engineered for performance. Crafted for longevity. Trusted by industrial leaders worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              className="bg-[#C8A04B] hover:bg-[#E6C667] text-[#000000] text-center py-4 px-8 font-bold uppercase tracking-widest text-xs transition-all duration-300 active:scale-95"
              href="/products"
            >
              Explore Products
            </Link>
            <Link
              className="border border-[#C8A04B] text-[#C8A04B] hover:bg-[#C8A04B] hover:text-[#000000] text-center py-4 px-8 font-bold uppercase tracking-widest text-xs transition-all duration-300 active:scale-95"
              href="/contact?tab=quote"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Teaser Section */}
      <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading">
              WHO WE ARE
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#FFFFFF] font-heading">
              Heritage of Precision
            </h2>
            <p className="text-[#CFCFCF] text-sm sm:text-base leading-relaxed">
              With over three decades of engineering excellence, Jalota Tools manufactures high-performance industrial instruments designed for peak productivity and maximum durability in the toughest environments.
            </p>
            <div className="pt-4">
              <Link
                className="inline-flex items-center text-[#C8A04B] hover:text-[#E6C667] font-bold uppercase tracking-widest text-xs group transition-all"
                href="/about"
              >
                Learn More
                <span className="material-symbols-outlined ml-2 transition-transform duration-300 group-hover:translate-x-2">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-square bg-[#1A1A1A] border border-[#C8A04B]/20 overflow-hidden">
            <img
              alt="Jalota Precision Manufacturing Factory Floor"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1rcyNp80Yo2fqTcy6kj3eyTnmvN0CcAryhOD-P3yYDNsdk2JytZGPbxI92ZZ-dBJqBGVOSlzwmbSL_ndtk-YhW0mA_Uo4q_3BdDMZbYbUNs85wTLT7B4BPUhjKXc2z0l0GtnO459DFc7luYc9MaUMUMbutrV0Ax6a6dL-M4jE95NnkJXHM5sjgInkhvr-01lb7qErnboprR07E3zNVcBaeHikv86o1JqU-618PouVtMOzqXk8BWENZ48NjQwswb2_3EVNNtg-E4yy"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-[#0D0D0D] border-y border-[#C8A04B]/10 py-20 overflow-hidden">
        <div className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto mb-10">
          <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-2">
            FEATURED PRODUCTS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white font-heading">
            Engineered Solutions
          </h2>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          {featuredProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-[#1A1A1A] border border-[#C8A04B]/10 hover:border-[#C8A04B]/40 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-square bg-[#000000] flex items-center justify-center overflow-hidden border-b border-[#C8A04B]/10 relative">
                  {product.images.length > 0 ? (
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={product.images[0]}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6">
                      <span className="material-symbols-outlined text-6xl text-[#C8A04B]/20">
                        construction
                      </span>
                      <span className="text-[8px] uppercase tracking-widest font-bold text-[#C8A04B]/30 mt-2">
                        Jalota Tools
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10 bg-[#C8A04B] text-[#000000] px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase font-heading">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-extrabold uppercase text-white font-heading group-hover:text-[#C8A04B] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#CFCFCF] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href={`/products/${product.slug}`}
                  className="text-xs font-bold uppercase tracking-widest text-[#C8A04B] hover:text-[#E6C667] inline-flex items-center gap-1 group/btn"
                >
                  View Details
                  <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/btn:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-2">
            CATALOGUE DIRECTORY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white font-heading">
            Browse Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.path}
              className="bg-[#1A1A1A] border border-[#C8A04B]/10 hover:border-[#C8A04B] hover:bg-[#000000] p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-4 group transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[#C8A04B] text-4xl group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white group-hover:text-[#C8A04B] transition-colors font-heading">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Strip Section */}
      <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="bg-[#1A1A1A] border border-[#C8A04B]/20 py-12 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-2 font-heading">
              Need a Custom Solution?
            </h2>
            <p className="text-sm text-[#CFCFCF] max-w-md">
              We design and manufacture specialty industrial equipment tailored to your project metrics and specifications.
            </p>
          </div>
          <Link
            className="w-full md:w-auto bg-[#C8A04B] hover:bg-[#E6C667] text-[#000000] text-center py-4 px-10 font-bold uppercase tracking-widest text-xs transition-all duration-300 active:scale-95"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
