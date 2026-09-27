"use client";

import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-[#1A1A1A] border border-[#C8A04B]/10 aspect-square overflow-hidden flex items-center justify-center p-8">
        {hasImages ? (
          <img
            src={images[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            className="w-full h-full object-contain"
          />
        ) : (
          /* Branded placeholder for products without images */
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-center">
            <div className="relative">
              <span className="material-symbols-outlined text-[100px] text-[#C8A04B]/20">
                construction
              </span>
              <span className="material-symbols-outlined text-3xl text-[#C8A04B]/40 absolute -bottom-1 -right-1">
                photo_camera
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C8A04B]/50 font-heading">
                Jalota Tools
              </p>
              <p className="text-[11px] text-[#747878]">
                Product image coming soon
              </p>
            </div>
          </div>
        )}

        {/* Prev / Next arrows (only when multiple images) */}
        {hasImages && images.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#000000]/60 hover:bg-[#C8A04B] text-white hover:text-[#000000] flex items-center justify-center transition-all duration-200"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-lg">
                chevron_left
              </span>
            </button>
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#000000]/60 hover:bg-[#C8A04B] text-white hover:text-[#000000] flex items-center justify-center transition-all duration-200"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 w-20 h-20 border overflow-hidden flex items-center justify-center p-2 bg-[#1A1A1A] transition-all duration-200 ${
                i === selectedIndex
                  ? "border-[#C8A04B]"
                  : "border-[#C8A04B]/10 hover:border-[#C8A04B]/40"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
