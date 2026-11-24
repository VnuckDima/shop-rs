import type { Product } from "@entities/Product";
import { STORAGE_KEYS } from "@shared/constants/storage";
import { readJSON, writeJSON } from "@shared/lib/storage";
import type { CartLine, CartStorage } from "./index";

type PersistedLine = {
  id: number;
  qty: number;
};

export function createCartStorage(products: Product[]): CartStorage {
  const byId = new Map(products.map((product) => [product.id, product]));

  return {
    load(): CartLine[] {
      const raw = readJSON<PersistedLine[]>(STORAGE_KEYS.cart, []);
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
        STORAGE_KEYS.cart,
        lines.map((line) => ({ id: line.product.id, qty: line.qty })),
      );
    },
  };
}