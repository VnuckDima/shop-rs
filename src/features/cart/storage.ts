import type { Product } from "@entities/Product";
import { readJSON, writeJSON } from "@shared/lib/storage";
import type { CartLine, CartStorage } from "./index";

const STORAGE_KEY = "shop-rs:cart";

type PersistedLine = {
  id: number;
  qty: number;
};

export function createCartStorage(products: Product[]): CartStorage {
  const byId = new Map(products.map((product) => [product.id, product]));

  return {
    load(): CartLine[] {
      const raw = readJSON<PersistedLine[]>(STORAGE_KEY, []);
      if (!Array.isArray(raw)) return [];

      return raw.flatMap((line) => {
        if (!line || typeof line.id !== "number") return [];
        const product = byId.get(line.id);
        if (!product || !Number.isFinite(line.qty) || line.qty <= 0) return [];
        return [{ product, qty: Math.floor(line.qty) }];
      });
    },

    save(lines: CartLine[]): void {
      writeJSON(
        STORAGE_KEY,
        lines.map((line) => ({ id: line.product.id, qty: line.qty })),
      );
    },
  };
}