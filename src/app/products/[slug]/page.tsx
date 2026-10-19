import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  generateSlug,
} from "@/lib/products";
import ProductImageGallery from "./ProductImageGallery";
import QuoteForm from "@/components/QuoteForm";

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }));
}

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const truncatedDesc =
    product.description.length > 155
      ? product.description.slice(0, 152) + "..."
      : product.description;

  return {
    title: `${product.name} | Jalota Tools`,
    description: truncatedDesc,
  };
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Short description: first two sentences
  const shortDescription = product.description
    .split(/(?<=\.)\s+/)
    .slice(0, 2)
    .join(" ");

  // Related products: same category, excluding current
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-24">
      {/* ─── Breadcrumb ─── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[#000000] border-b border-[#C8A04B]/10 py-4 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
            <li>
              <Link
                href="/"
                className="text-[#CFCFCF] hover:text-[#C8A04B] transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-[#747878]">/</li>
            <li>
              <Link
                href="/products"
                className="text-[#CFCFCF] hover:text-[#C8A04B] transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="text-[#747878]">/</li>
            <li>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-[#CFCFCF] hover:text-[#C8A04B] transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-[#747878]">/</li>
            <li className="text-[#C8A04B] truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* ─── Hero: Gallery + Core Info ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />

          {/* Core Info */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Category Badge */}
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="self-start bg-[#C8A04B] text-[#000000] px-3 py-1 text-[9px] font-bold tracking-wider uppercase font-heading hover:bg-[#E6C667] transition-colors"
            >
              {product.category}
            </Link>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-heading leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-[#CFCFCF] leading-relaxed">
              {shortDescription}
            </p>

            {/* CTA */}
            <a
              href="#request-quote"
              className="self-start bg-[#C8A04B] hover:bg-[#E6C667] text-[#000000] text-center py-4 px-10 font-bold uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                request_quote
              </span>
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* ─── Full Description ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-[#C8A04B]/10">
        <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-4">
          About This Product
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-heading mb-6">
          Full Description
        </h2>
        <p className="text-sm sm:text-base text-[#CFCFCF] leading-relaxed max-w-4xl">
          {product.description}
        </p>
      </section>

      {/* ─── Features ─── */}
      {product.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-[#C8A04B]/10">
          <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-4">
            Product Specifications
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-heading mb-8">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="material-symbols-outlined text-[#C8A04B] text-lg mt-0.5 shrink-0">
                  check_circle
                </span>
                <span className="text-sm text-[#CFCFCF] leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ─── Applications ─── */}
      {product.applications.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-[#C8A04B]/10">
          <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-4">
            Use Cases
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-heading mb-8">
            Applications
          </h2>
          <div className="flex flex-wrap gap-3 max-w-4xl">
            {product.applications.map((app, i) => (
              <span
                key={i}
                className="border border-[#C8A04B]/30 text-[#CFCFCF] px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:border-[#C8A04B] hover:text-[#C8A04B] transition-all duration-200"
              >
                {app}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ─── Size Table ─── */}
      {product.sizeTable.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-[#C8A04B]/10">
          <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-4">
            Dimensions
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-heading mb-8">
            Size Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1A1A1A] border border-[#C8A04B]/20">
                  {Object.keys(product.sizeTable[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#C8A04B] font-heading border-r border-[#C8A04B]/10 last:border-r-0"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.sizeTable.map((row, i) => (
                  <tr
                    key={i}
                    className="border border-[#C8A04B]/10 hover:bg-[#1A1A1A]/50 transition-colors"
                  >
                    {Object.values(row).map((val, j) => (
                      <td
                        key={j}
                        className="px-6 py-3 text-sm text-[#CFCFCF] border-r border-[#C8A04B]/10 last:border-r-0"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ─── Request a Quote Form ─── */}
      <section
        id="request-quote"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-[#C8A04B]/10"
      >
        <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-4">
          Get Pricing
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-heading mb-8">
          Request a Quote
        </h2>
        <div className="bg-[#1A1A1A] border border-[#C8A04B]/20 p-6 sm:p-10 max-w-2xl">
          <QuoteForm productName={product.name} />
        </div>
      </section>

      {/* ─── Related Products ─── */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-[#C8A04B]/10">
          <p className="text-[#C8A04B] font-bold uppercase tracking-widest text-xs font-heading mb-4">
            More From {product.category}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-heading mb-10">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.slug}
                href={`/products/${related.slug}`}
                className="group flex flex-col"
              >
                <div className="relative bg-[#1A1A1A] border border-[#C8A04B]/10 aspect-square overflow-hidden mb-4 flex items-center justify-center">
                  {related.images.length > 0 ? (
                    <img
                      src={related.images[0]}
                      alt={related.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#747878] p-6">
                      <span className="material-symbols-outlined text-5xl mb-2 text-[#C8A04B]/30">
                        construction
                      </span>
                      <span className="text-[8px] uppercase tracking-widest font-bold text-[#C8A04B]/40">
                        Jalota Tools
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-10 bg-[#C8A04B] text-[#000000] px-2 py-0.5 text-[7px] font-bold tracking-wider uppercase font-heading">
                    {related.category}
                  </div>
                </div>
                <h3 className="font-extrabold uppercase text-sm text-white mb-1 group-hover:text-[#C8A04B] transition-colors font-heading leading-tight">
                  {related.name}
                </h3>
                <p className="text-[11px] text-[#CFCFCF] line-clamp-2 leading-relaxed mb-3">
                  {related.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#C8A04B] hover:text-[#E6C667] group/link mt-auto">
                  View Details
                  <span className="material-symbols-outlined text-xs transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
