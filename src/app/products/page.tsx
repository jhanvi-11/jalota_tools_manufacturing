"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { mockProducts, Product } from "@/data/mockProducts";

function ProductsContent() {
  const searchParams = useSearchParams();
  
  // Available categories
  const categories = ["ALL", "HAND TOOLS", "CUTTING TOOLS", "MEASURING", "POWER ACCESSORIES"];
  
  // State
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  // Sync category with URL search param if present
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam && categories.includes(catParam.toUpperCase())) {
      setSelectedCategory(catParam.toUpperCase());
    } else {
      setSelectedCategory("ALL");
    }
  }, [searchParams]);

  // Handle filtering logic
  useEffect(() => {
    let result = mockProducts;

    // Filter by Category
    if (selectedCategory !== "ALL") {
      result = result.filter(
        (product) => product.category.toUpperCase() === selectedCategory
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-24">
      {/* Page Header Banner */}
      <header className="bg-[#1A1A1A] border-b border-[#C8A04B]/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-white font-heading">
            OUR PRODUCTS
          </h1>
          <p className="text-sm sm:text-base text-[#CFCFCF]/80 max-w-2xl leading-relaxed">
            Precision-engineered instruments for industrial excellence and uncompromising performance.
          </p>
        </div>
      </header>

      {/* Category Filter & Search Bar */}
      <section className="bg-[#000000] border-b border-[#C8A04B]/10 py-4 sticky top-16 md:top-20 z-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories Scroll Chips */}
          <div className="flex items-center space-x-3 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 border font-bold text-[10px] tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-[#C8A04B] border-[#C8A04B] text-[#000000]"
                      : "bg-transparent border-[#747878] text-[#CFCFCF] hover:border-[#C8A04B] hover:text-[#C8A04B]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="SEARCH INSTRUMENTS"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#747878] focus:border-[#C8A04B] px-10 py-2.5 text-[11px] font-semibold tracking-wider text-white placeholder-[#747878] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#CFCFCF] hover:text-[#C8A04B]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#C8A04B]/20 bg-[#1A1A1A]">
            <span className="material-symbols-outlined text-5xl mb-4 text-[#C8A04B]">
              build_circle
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-heading">
              No Instruments Found
            </h3>
            <p className="text-sm text-[#CFCFCF]/60 mt-2">
              Try adjusting your category filter or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col justify-between">
                <div>
                  <div className="relative bg-[#1A1A1A] border border-[#C8A04B]/10 aspect-square overflow-hidden mb-6 flex items-center justify-center p-6 sm:p-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#C8A04B] text-[#000000] px-2 py-0.5 text-[8px] font-bold tracking-wider uppercase font-heading">
                      {product.category}
                    </div>
                  </div>
                  <h3 className="font-extrabold uppercase text-base sm:text-lg text-white mb-2 group-hover:text-[#C8A04B] transition-colors font-heading leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#CFCFCF] line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8A04B] hover:text-[#E6C667] group/link transition-all"
                >
                  VIEW DETAILS
                  <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/link:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination bar */}
        {filteredProducts.length > 0 && (
          <div className="mt-24 border-t border-[#C8A04B]/20 pt-12 flex justify-center items-center gap-6">
            <button className="w-10 h-10 border border-[#747878] hover:border-[#C8A04B] hover:text-[#C8A04B] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="font-bold text-[10px] sm:text-xs tracking-widest uppercase text-[#CFCFCF]">
              PAGE 1 OF {Math.max(1, Math.ceil(filteredProducts.length / 8))}
            </span>
            <button className="w-10 h-10 border border-[#747878] hover:border-[#C8A04B] hover:text-[#C8A04B] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-4xl animate-spin text-[#C8A04B]">
            progress_activity
          </span>
          <p className="text-xs uppercase tracking-widest text-[#CFCFCF]">Loading Catalog...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
