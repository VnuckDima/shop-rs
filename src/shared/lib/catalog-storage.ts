import type { Product } from "./product";
import { readJSON, writeJSON } from "./storage";

const STORAGE_KEY = "shop-rs:products:v1";

type StoredCatalog = {
  fingerprint: string;
  products: Product[];
};

function fingerprint(products: Product[]): string {
  const source = products
    .map(
      (product) =>
        `${product.id}:${product.title}:${product.price}:${product.category}`,
    )
    .join("|");

  let hash = 0;
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) | 0;
  }
  return String(hash);
}

export function loadProducts(fallback: Product[]): Product[] {
  const stored = readJSON<StoredCatalog | null>(STORAGE_KEY, null);
  const seed = fingerprint(fallback);

  if (
    stored &&
    stored.fingerprint === seed &&
    Array.isArray(stored.products) &&
    stored.products.length > 0
  ) {
    return stored.products;
  }

  writeJSON(STORAGE_KEY, { fingerprint: seed, products: fallback });
  return fallback;
}