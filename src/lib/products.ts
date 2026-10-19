import rawProducts from "../../public/products.json";

// Raw shape from products.json — note the "apllications" typo and "size table" key
interface RawProduct {
  name: string;
  category: string;
  description: string;
  images: string[];
  "size table": Record<string, string>[];
  features: string[];
  apllications?: string[];
  applications?: string[];
}

// Clean public-facing type used across the app
export interface Product {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  sizeTable: Record<string, string>[];
  features: string[];
  applications: string[];
}

/**
 * Generate a URL-safe slug from a product name.
 * - Converts to lowercase
 * - Replaces special characters (–, &, etc.) with hyphens
 * - Strips non-alphanumeric characters (except hyphens)
 * - Collapses multiple hyphens
 * - Trims leading/trailing hyphens
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[–—]/g, "-")           // em-dash / en-dash → hyphen
    .replace(/&/g, "and")             // & → "and"
    .replace(/['']/g, "")             // curly quotes
    .replace(/[^a-z0-9]+/g, "-")      // non-alphanumeric → hyphen
    .replace(/-+/g, "-")              // collapse multiple hyphens
    .replace(/^-|-$/g, "");           // trim leading/trailing hyphens
}

/**
 * Ensure image paths work seamlessly in Next.js public folder routing.
 * Strips accidental "/public" prefixes and ensures a leading slash.
 */
function normalizeImagePath(path: string): string {
  if (!path) return "";
  const trimmed = path.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }
  let clean = trimmed.replace(/^\/?public\//, "/");
  if (!clean.startsWith("/")) {
    clean = `/${clean}`;
  }
  if (!clean.startsWith("/images/")) {
    clean = `/images${clean}`;
  }
  return clean;
}

/**
 * Normalize a raw product record into the clean Product type.
 */
function normalizeProduct(raw: RawProduct): Product {
  return {
    name: raw.name,
    slug: generateSlug(raw.name),
    category: raw.category,
    description: raw.description,
    images: (raw.images ?? []).map(normalizeImagePath).filter(Boolean),
    sizeTable: raw["size table"] ?? [],
    features: raw.features ?? [],
    // Map the "apllications" typo safely; fall back to "applications" if fixed later
    applications: raw.apllications ?? raw.applications ?? [],
  };
}

// Pre-compute the normalized product list once at build time
const products: Product[] = (rawProducts as RawProduct[]).map(normalizeProduct);

/** Get all products (normalized). */
export function getAllProducts(): Product[] {
  return products;
}

/** Find a single product by its slug. Returns undefined if not found. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get products in a given category (case-insensitive match). */
export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export interface Category {
  name: string;
  count: number;
  image: string | null;
}

/** Get all unique categories with stats. */
export function getAllCategories(): Category[] {
  const categoryMap = new Map<string, Category>();

  for (const p of products) {
    const rawCat = p.category;
    // Normalize category name (trim, capitalize first letter, etc if needed, but here we just trim and use original casing)
    const normalizedCat = rawCat.trim();
    const key = normalizedCat.toLowerCase();
    
    if (!categoryMap.has(key)) {
      categoryMap.set(key, {
        name: normalizedCat,
        count: 0,
        image: p.images.length > 0 ? p.images[0] : null,
      });
    }
    
    categoryMap.get(key)!.count++;
  }

  return Array.from(categoryMap.values());
}
