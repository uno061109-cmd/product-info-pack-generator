export const productCategories = ["Jewelry", "Fashion Accessories", "Home Goods", "Pet Accessories", "Other"] as const;
export const targetMarkets = ["EU", "UK", "US", "Global"] as const;
export const ageRestrictions = ["Not applicable", "3+", "6+", "12+", "14+"] as const;
export const binaryAnswers = ["No", "Yes"] as const;

export type ProductCategory = (typeof productCategories)[number];
export type TargetMarket = (typeof targetMarkets)[number];
export type AgeRestriction = (typeof ageRestrictions)[number];
export type BinaryAnswer = (typeof binaryAnswers)[number];
export type ProductStatus = "Draft" | "Missing Info" | "Ready";

export type ProductInput = {
  productName: string;
  sku: string;
  category: ProductCategory;
  targetMarket: TargetMarket;
  brandName: string;
  sellerName: string;
  countryOfOrigin: string;
  materials: string;
  dimensions: string;
  weight: string;
  colors: string;
  intendedUse: string;
  targetCustomer: string;
  keySellingPoints: string;
  includedInPackage: string;
  careInstructions: string;
  safetyWarnings: string;
  ageRestriction: AgeRestriction;
  skinContact: BinaryAnswer;
  foodContact: BinaryAnswer;
  containsBattery: BinaryAnswer;
  containsSmallParts: BinaryAnswer;
  ecoClaims: string;
  packagingMaterial: string;
  recyclingInstructions: string;
  labelNotes: string;
  manufacturerImporterInfo: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
};

export const requiredFieldLabels: Array<{ key: keyof ProductInput; label: string; message: string }> = [
  { key: "productName", label: "Product Name", message: "Product name is missing." },
  { key: "sku", label: "SKU", message: "SKU is missing." },
  { key: "category", label: "Category", message: "Category is missing." },
  { key: "targetMarket", label: "Target Market", message: "Target market is missing." },
  { key: "brandName", label: "Brand Name", message: "Brand name is missing." },
  { key: "sellerName", label: "Seller Name", message: "Seller name is missing." },
  { key: "countryOfOrigin", label: "Country of Origin", message: "Country of origin is missing." },
  { key: "materials", label: "Materials", message: "Materials are missing." },
  { key: "dimensions", label: "Dimensions", message: "Dimensions are missing." },
  { key: "weight", label: "Weight", message: "Weight is missing." },
  { key: "colors", label: "Colors", message: "Colors are missing." },
  { key: "intendedUse", label: "Intended Use", message: "Intended use is missing." },
  { key: "targetCustomer", label: "Target Customer", message: "Target customer is missing." },
  { key: "keySellingPoints", label: "Key Selling Points", message: "Key selling points are missing." },
  { key: "includedInPackage", label: "Package Contents", message: "Package contents are missing." },
  { key: "careInstructions", label: "Care Instructions", message: "Care instructions are missing." },
  { key: "safetyWarnings", label: "Safety Warnings", message: "Safety warnings are missing." },
  { key: "packagingMaterial", label: "Packaging Material", message: "Packaging material is missing." },
  { key: "recyclingInstructions", label: "Recycling Instructions", message: "Recycling instructions are missing." }
];

export function createEmptyProduct(): ProductInput {
  const now = new Date().toISOString();

  return {
    productName: "",
    sku: "",
    category: "Jewelry",
    targetMarket: "EU",
    brandName: "",
    sellerName: "",
    countryOfOrigin: "",
    materials: "",
    dimensions: "",
    weight: "",
    colors: "",
    intendedUse: "",
    targetCustomer: "",
    keySellingPoints: "",
    includedInPackage: "",
    careInstructions: "",
    safetyWarnings: "",
    ageRestriction: "Not applicable",
    skinContact: "No",
    foodContact: "No",
    containsBattery: "No",
    containsSmallParts: "No",
    ecoClaims: "",
    packagingMaterial: "",
    recyclingInstructions: "",
    labelNotes: "",
    manufacturerImporterInfo: "",
    imageUrls: [],
    createdAt: now,
    updatedAt: now
  };
}

export const sampleProduct: ProductInput = {
  productName: "Gold Plated Pearl Hoop Earrings",
  sku: "SAMPLE-JWL-001",
  category: "Jewelry",
  targetMarket: "EU",
  brandName: "Studio Sample",
  sellerName: "Sample Cross-border Seller",
  countryOfOrigin: "China",
  materials: "Gold plated copper alloy, imitation pearl, stainless steel post",
  dimensions: "Hoop diameter 24 mm; pearl diameter 8 mm",
  weight: "Approx. 8 g per pair",
  colors: "Gold, ivory white",
  intendedUse: "Fashion jewelry accessory for daily styling and gift sets",
  targetCustomer: "Adults looking for lightweight fashion jewelry",
  keySellingPoints: "Lightweight hoop shape, polished gold tone, classic pearl accent, gift-ready presentation",
  includedInPackage: "1 pair of earrings, 1 soft pouch, 1 care card",
  careInstructions: "Keep dry. Avoid perfume, sweat and household chemicals. Wipe with a soft dry cloth after use.",
  safetyWarnings:
    "For external wear only. Not intended for children. Keep away from small children. Choking hazard: contains small parts.",
  ageRestriction: "14+",
  skinContact: "Yes",
  foodContact: "No",
  containsBattery: "No",
  containsSmallParts: "Yes",
  ecoClaims: "",
  packagingMaterial: "Recyclable paper card and kraft paper box",
  recyclingInstructions: "Separate paper packaging where local recycling facilities exist.",
  labelNotes: "Remove before showering or swimming.",
  manufacturerImporterInfo: "Manufacturer / importer information to be added by seller before commercial use.",
  imageUrls: ["/images/product-pack-hero.svg"],
  createdAt: "2026-06-03T00:00:00.000Z",
  updatedAt: "2026-06-03T00:00:00.000Z"
};
