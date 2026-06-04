export const productCategories = [
  "Apparel",
  "Auto Accessories",
  "Baby & Kids",
  "Bags & Wallets",
  "Beauty Tools",
  "Consumer Electronics Accessories",
  "Craft Supplies",
  "Fashion Accessories",
  "Garden Supplies",
  "Health & Personal Care Accessories",
  "Home Decor",
  "Home Goods",
  "Jewelry",
  "Kitchenware",
  "Office & Stationery",
  "Outdoor & Sports",
  "Party Supplies",
  "Pet Accessories",
  "Phone Accessories",
  "Seasonal Products",
  "Shoes",
  "Small Electronics",
  "Tools & Hardware",
  "Toys & Games",
  "Travel Accessories",
  "Other"
] as const;

export const targetMarkets = [
  "EU",
  "UK",
  "US",
  "Canada",
  "Australia",
  "Japan",
  "South Korea",
  "Middle East",
  "Southeast Asia",
  "Global"
] as const;
export const ageRestrictions = ["Not applicable", "3+", "6+", "12+", "14+"] as const;
export const binaryAnswers = ["No", "Yes"] as const;

export type ProductCategory = (typeof productCategories)[number];
export type TargetMarket = (typeof targetMarkets)[number];
export type AgeRestriction = (typeof ageRestrictions)[number];
export type BinaryAnswer = (typeof binaryAnswers)[number];
export type ProductStatus = "Draft" | "Missing Info" | "Ready";

export type CategoryMeta = {
  value: ProductCategory;
  zh: string;
  letter: string;
  hint: string;
};

export const categoryMetadata: CategoryMeta[] = [
  { value: "Apparel", zh: "服装", letter: "A", hint: "尺码、面料、洗护说明、吊牌信息" },
  { value: "Auto Accessories", zh: "汽车配件", letter: "A", hint: "适配车型、安装提示、安全提醒" },
  { value: "Baby & Kids", zh: "母婴儿童用品", letter: "B", hint: "年龄段、小部件、护理和安全提示" },
  { value: "Bags & Wallets", zh: "箱包钱包", letter: "B", hint: "材质、尺寸、容量、护理说明" },
  { value: "Beauty Tools", zh: "美妆工具", letter: "B", hint: "材质、皮肤接触、清洁和使用限制" },
  { value: "Consumer Electronics Accessories", zh: "消费电子配件", letter: "C", hint: "兼容性、电池、包装和警示语" },
  { value: "Craft Supplies", zh: "手工材料", letter: "C", hint: "材质、数量、年龄提示、小部件风险" },
  { value: "Fashion Accessories", zh: "服饰配件", letter: "F", hint: "尺寸、材质、搭配用途、护理说明" },
  { value: "Garden Supplies", zh: "园艺用品", letter: "G", hint: "户外用途、材质、包装、回收说明" },
  { value: "Health & Personal Care Accessories", zh: "个护配件", letter: "H", hint: "皮肤接触、材质、清洁和免责声明" },
  { value: "Home Decor", zh: "家居装饰", letter: "H", hint: "材质、尺寸、摆放用途、包装说明" },
  { value: "Home Goods", zh: "家居用品", letter: "H", hint: "用途、尺寸、包装、回收说明" },
  { value: "Jewelry", zh: "饰品珠宝", letter: "J", hint: "材质、皮肤接触、过敏提示、护理说明" },
  { value: "Kitchenware", zh: "厨房用品", letter: "K", hint: "食品接触、材质、清洁、安全提示" },
  { value: "Office & Stationery", zh: "办公文具", letter: "O", hint: "规格、材质、套装内容、小部件" },
  { value: "Outdoor & Sports", zh: "户外运动", letter: "O", hint: "用途、尺寸、承重、使用警示" },
  { value: "Party Supplies", zh: "派对用品", letter: "P", hint: "材质、数量、年龄和小部件提示" },
  { value: "Pet Accessories", zh: "宠物配件", letter: "P", hint: "宠物尺寸、监督使用、清洁说明" },
  { value: "Phone Accessories", zh: "手机配件", letter: "P", hint: "兼容性、材质、安装和电池提示" },
  { value: "Seasonal Products", zh: "节日季节用品", letter: "S", hint: "适用场景、包装、储存、警示语" },
  { value: "Shoes", zh: "鞋履", letter: "S", hint: "尺码、材质、鞋底、护理说明" },
  { value: "Small Electronics", zh: "小型电子产品", letter: "S", hint: "电池、充电、使用警示、认证占位" },
  { value: "Tools & Hardware", zh: "工具五金", letter: "T", hint: "用途、材质、使用警示、包装说明" },
  { value: "Toys & Games", zh: "玩具游戏", letter: "T", hint: "年龄段、小部件、材质和安全警示" },
  { value: "Travel Accessories", zh: "旅行配件", letter: "T", hint: "尺寸、材质、使用场景、护理说明" },
  { value: "Other", zh: "其他", letter: "O", hint: "按商品实际情况补充资料" }
];

export const categoryLetters = Array.from(new Set(categoryMetadata.map((item) => item.letter))).sort();

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
