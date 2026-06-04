export function ProductImageStrip({
  images,
  fallback = "/images/product-pack-hero.svg",
  className = ""
}: {
  images: string[];
  fallback?: string;
  className?: string;
}) {
  const visibleImages = images.length > 0 ? images : [fallback];

  return (
    <div className={`grid gap-3 ${visibleImages.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${className}`}>
      {visibleImages.slice(0, 4).map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt={`Product visual ${index + 1}`}
          className="aspect-[4/3] w-full rounded-lg border border-line bg-mist object-cover"
        />
      ))}
    </div>
  );
}
