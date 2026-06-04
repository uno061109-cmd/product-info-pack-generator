"use client";

import { useEffect, useState } from "react";
import { createProductVisualDataUri } from "@/lib/productVisual";
import type { ProductInput } from "@/lib/productTypes";

export function ProductImageStrip({
  images,
  fallback = "/images/product-pack-hero.svg",
  product,
  className = ""
}: {
  images: string[];
  fallback?: string;
  product?: ProductInput;
  className?: string;
}) {
  const fallbackSrc = product ? createProductVisualDataUri(product) : fallback;
  const visibleImages = images.length > 0 ? images : [fallbackSrc];

  return (
    <div className={`grid gap-3 ${visibleImages.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${className}`}>
      {visibleImages.slice(0, 4).map((src, index) => (
        <ProductVisualImage
          key={`${src}-${index}`}
          src={src}
          fallback={fallbackSrc}
          alt={`Product visual ${index + 1}`}
        />
      ))}
    </div>
  );
}

function ProductVisualImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={() => setCurrentSrc(fallback)}
      className="aspect-[4/3] w-full rounded-lg border border-line bg-mist object-cover"
    />
  );
}
