
import type { Product } from "@entities/Product";

export type FavoritesState = {
  products: Product[];
};

export type FavoritesStorage = {
  load: () => Product[];
  save: (products: Product[]) => void;
};

export type FavoritesOptions = {
  storage?: FavoritesStorage;
};

export type FavoritesApi = {
  toggle: (product: Product) => void;
  add: (product: Product) => void;
  remove: (productId: number) => void;
  has: (productId: number) => boolean;
  items: () => Product[];
  clear: () => void;
  subscribe: (listener: (state: FavoritesState) => void) => () => void;
};

export function createFavorites(
  { storage }: FavoritesOptions = {},
): FavoritesApi {
  const state: FavoritesState = {
    products: storage ? storage.load() : [],
  };

  const listeners = new Set<(state: FavoritesState) => void>();

  const notify = () => {
    storage?.save(state.products);
    listeners.forEach((listener) => listener(state));
  };

  const has = (productId: number): boolean =>
    state.products.some((product) => product.id === productId);

  return {
    toggle(product) {
      if (has(product.id)) {
        state.products = state.products.filter(
          (item) => item.id !== product.id,
        );
      } else {
        state.products.push(product);
      }
      notify();
    },

    add(product) {
      if (has(product.id)) return;
      state.products.push(product);
      notify();
    },

    remove(productId) {
      state.products = state.products.filter(
        (product) => product.id !== productId,
      );
      notify();
    },

    has,

    items() {
      return state.products;
    },

    clear() {
      state.products = [];
      notify();
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
