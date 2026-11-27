
import type { Product } from "@entities/Product";
import { STORAGE_KEYS } from "@shared/constants/storage";
import { readJSON, writeJSON } from "@shared/lib/storage";
import type { FavoritesStorage } from "./index";

export function createFavoritesStorage(
  products: Product[],
): FavoritesStorage {
  const byId = new Map(products.map((product) => [product.id, product]));

  return {
    load(): Product[] {
      const raw = readJSON<number[]>(STORAGE_KEYS.favorites, []);

      if (!Array.isArray(raw)) return [];

      return raw.flatMap((id) => {
        if (typeof id !== "number") return [];

        const product = byId.get(id);
        return product ? [product] : [];
      });
    },

    save(items: Product[]): void {
      writeJSON(
        STORAGE_KEYS.favorites,
        items.map((product) => product.id),
      );
    },
  };
}
