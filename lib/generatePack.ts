import {
  ProductInput,
  ProductStatus,
  requiredFieldLabels
} from "@/lib/productTypes";

export const productPackDisclaimer =
  "This Product Info Pack is generated for product documentation and listing preparation purposes only. It is not legal advice, compliance certification, or official Digital Product Passport certification. Sellers should verify applicable regulations and platform requirements before using the information commercially.";

export type MissingInfoAnalysis = {
  completedRequiredFields: number;
  totalRequiredFields: number;
  completionPercentage: number;
  missingFields: string[];
  recommendations: string[];
  status: ProductStatus;
};

export type GeneratedPack = {
  listing: {
    title: string;
    bulletPoints: string[];
    description: string;
    keywords: string[];
    faq: Array<{ question: string; answer: string }>;
  };
  informationCard: Array<{ label: string; value: string }>;
  packagingLabelText: string[];
  riskChecklist: Array<{ label: string; value: string; note: string }>;
  missingInfo: MissingInfoAnalysis;
};

function hasValue(value: ProductInput[keyof ProductInput]) {
  if (Array.isArray(value)) {
    return value.length > 0 && value.some((item) => item.trim().length > 0);
  }

  return String(value ?? "").trim().length > 0;
}

function valueOrFallback(value: string, fallback: string) {
  return value.trim() || fallback;
}

function contains(text: string, patterns: string[]) {
  const normalized = text.toLowerCase();
  return patterns.some((pattern) => normalized.includes(pattern));
}

export function analyzeMissingInfo(product: ProductInput): MissingInfoAnalysis {
  const missingFields = requiredFieldLabels
    .filter((field) => !hasValue(product[field.key]))
    .map((field) => field.message);
  const completedRequiredFields = requiredFieldLabels.length - missingFields.length;
  const recommendations: string[] = [];

  if (
    product.containsSmallParts === "Yes" &&
    !contains(product.safetyWarnings, ["choking", "small parts", "keep away from children"])
  ) {
    recommendations.push("If the product contains small parts, add a choking hazard warning.");
  }

  if (
    product.skinContact === "Yes" &&
    (!hasValue(product.materials) || !contains(product.safetyWarnings, ["allergy", "skin", "irritation", "sensitive"]))
  ) {
    recommendations.push("If the product touches skin, add material and allergy-related notes.");
  }

  if (product.ecoClaims.trim().length > 0) {
    recommendations.push("If eco claims are used, remind the seller to verify claims with evidence.");
  }

  if (
    product.containsBattery === "Yes" &&
    !contains(product.safetyWarnings, ["battery", "charge", "charging", "disposal"])
  ) {
    recommendations.push("If the product contains a battery, add battery handling, disposal and shipping reminders.");
  }

  const completionPercentage = Math.round((completedRequiredFields / requiredFieldLabels.length) * 100);
  const status: ProductStatus =
    completionPercentage === 100 && recommendations.length === 0
      ? "Ready"
      : completionPercentage < 50
        ? "Draft"
        : "Missing Info";

  return {
    completedRequiredFields,
    totalRequiredFields: requiredFieldLabels.length,
    completionPercentage,
    missingFields,
    recommendations,
    status
  };
}

function categoryPositioning(product: ProductInput) {
  switch (product.category) {
    case "Jewelry":
      return "Highlight materials, skin contact notes, gift-ready styling and care instructions.";
    case "Fashion Accessories":
      return "Highlight size, material, styling use, comfort and everyday care.";
    case "Home Goods":
      return "Highlight intended use, dimensions, packaging, recycling and household care.";
    case "Pet Accessories":
      return "Highlight intended pet use, sizing, supervision, materials and cleaning notes.";
    default:
      return "Highlight clear product use, material details, packaging and seller-provided care notes.";
  }
}

function suggestedKeywords(product: ProductInput) {
  return [
    product.productName,
    product.category,
    product.materials,
    product.colors,
    product.intendedUse,
    product.targetCustomer,
    product.brandName
  ]
    .join(", ")
    .split(/[,\n]/)
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 14);
}

export function generatePack(product: ProductInput): GeneratedPack {
  const missingInfo = analyzeMissingInfo(product);
  const productName = valueOrFallback(product.productName, "Product name to be confirmed");
  const brandName = valueOrFallback(product.brandName, "Brand to be confirmed");
  const materials = valueOrFallback(product.materials, "materials to be confirmed");
  const dimensions = valueOrFallback(product.dimensions, "dimensions to be confirmed");
  const weight = valueOrFallback(product.weight, "weight to be confirmed");
  const intendedUse = valueOrFallback(product.intendedUse, "intended use to be confirmed");
  const careInstructions = valueOrFallback(product.careInstructions, "Care instructions to be confirmed by seller.");
  const safetyWarnings = valueOrFallback(product.safetyWarnings, "Safety warnings to be confirmed by seller.");
  const packageContents = valueOrFallback(product.includedInPackage, "Package contents to be confirmed.");
  const packagingMaterial = valueOrFallback(product.packagingMaterial, "Packaging material to be confirmed.");
  const recyclingInstructions = valueOrFallback(
    product.recyclingInstructions,
    "Recycling instructions to be confirmed according to local facilities."
  );
  const countryOfOrigin = valueOrFallback(product.countryOfOrigin, "Country of origin to be confirmed");
  const categoryNote = categoryPositioning(product);
  const titleParts = [brandName, productName, product.category, product.materials, product.colors]
    .map((item) => item.trim())
    .filter(Boolean);

  const bulletPoints = [
    `Structured product details: ${productName} made with ${materials}.`,
    `Designed for ${intendedUse}; suitable customer profile: ${valueOrFallback(product.targetCustomer, "target customer to be confirmed")}.`,
    `Sizing and package reference: ${dimensions}; ${weight}; includes ${packageContents}.`,
    `Care guidance: ${careInstructions}`,
    `Seller documentation note: ${categoryNote}`
  ];

  const description = `${productName} is a ${product.category.toLowerCase()} item prepared for ${product.targetMarket} cross-border listing documentation. The current product record describes ${materials}, ${dimensions}, ${weight}, and intended use as ${intendedUse}. Sellers can reuse this structured copy for marketplace listing drafts, product information cards, packaging notes and QR product pages. Please verify all product claims, warnings, importer details and platform requirements before publishing.`;

  const packagingLabelText = [
    `Care label: ${careInstructions}`,
    `Safety warning label: ${safetyWarnings}`,
    `Recycling note: ${recyclingInstructions}`,
    `Material note: ${materials}`,
    `Country of origin: ${countryOfOrigin}`,
    product.containsSmallParts === "Yes" ? "Small parts warning: Choking hazard. Keep away from small children." : "",
    product.containsBattery === "Yes" ? "Battery warning: Follow battery safety, charging, disposal and shipping rules." : "",
    product.skinContact === "Yes" ? "Skin contact note: Verify material composition and include allergy-related notes where relevant." : "",
    product.labelNotes.trim() ? `Additional label note: ${product.labelNotes}` : ""
  ].filter(Boolean);

  const needsFurtherReview =
    product.containsBattery === "Yes" ||
    product.foodContact === "Yes" ||
    product.containsSmallParts === "Yes" ||
    product.skinContact === "Yes" ||
    product.ecoClaims.trim().length > 0 ||
    product.ageRestriction !== "Not applicable";

  return {
    listing: {
      title: titleParts.slice(0, 5).join(" - "),
      bulletPoints,
      description,
      keywords: suggestedKeywords(product),
      faq: [
        {
          question: "What materials is this product made from?",
          answer: materials
        },
        {
          question: "How should customers use this product?",
          answer: intendedUse
        },
        {
          question: "How should customers care for this product?",
          answer: careInstructions
        },
        {
          question: "What is included in the package?",
          answer: packageContents
        },
        {
          question: "Are there any safety notes?",
          answer: safetyWarnings
        }
      ]
    },
    informationCard: [
      { label: "Product Name", value: productName },
      { label: "SKU", value: valueOrFallback(product.sku, "SKU to be confirmed") },
      { label: "Category", value: product.category },
      { label: "Materials", value: materials },
      { label: "Dimensions", value: dimensions },
      { label: "Weight", value: weight },
      { label: "Country of Origin", value: countryOfOrigin },
      { label: "Intended Use", value: intendedUse },
      { label: "Care Instructions", value: careInstructions },
      { label: "Safety Warnings", value: safetyWarnings },
      { label: "Packaging Information", value: packagingMaterial },
      { label: "Recycling Information", value: recyclingInstructions },
      {
        label: "Seller Contact Placeholder",
        value: product.manufacturerImporterInfo.trim() || "Seller contact / importer details to be added before use."
      }
    ],
    packagingLabelText,
    riskChecklist: [
      { label: "Contains battery?", value: product.containsBattery, note: product.containsBattery === "Yes" ? "Battery handling review recommended." : "No battery flag selected." },
      { label: "Intended for children?", value: product.ageRestriction === "Not applicable" ? "No" : product.ageRestriction, note: "Review age grading, warnings and marketplace category rules." },
      { label: "Contains small parts?", value: product.containsSmallParts, note: product.containsSmallParts === "Yes" ? "Add choking hazard warning and age guidance." : "No small parts flag selected." },
      { label: "Food contact?", value: product.foodContact, note: product.foodContact === "Yes" ? "Food-contact documentation review recommended." : "No food-contact flag selected." },
      { label: "Skin contact?", value: product.skinContact, note: product.skinContact === "Yes" ? "Material and allergy notes should be verified." : "No skin-contact flag selected." },
      { label: "Environmental claims?", value: product.ecoClaims.trim() ? "Yes" : "No", note: product.ecoClaims.trim() || "No environmental claim entered." },
      { label: "Needs further compliance review?", value: needsFurtherReview ? "Yes" : "No", note: "This checklist is for documentation support only and is not legal compliance certification." }
    ],
    missingInfo
  };
}

export async function generatePackWithAI(product: ProductInput): Promise<GeneratedPack> {
  // TODO: Replace this rules-based generator with a server-side AI API call when API keys and review workflow are ready.
  return generatePack(product);
}
