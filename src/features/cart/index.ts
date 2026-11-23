import type { Product } from "@entities/Product";

export type CartState = {
  items: Product[];
};

export type CartApi = {
  add: (product: Product) => void;
  remove: (productId: number) => void;
  total: () => number;
  count: () => number;
  subscribe: (listener: (state: CartState) => void) => void;
};

export function createCart(): CartApi {
  const state: CartState = { items: [] };
  const listeners = new Set<(state: CartState) => void>();

  const notify = () => listeners.forEach((listener) => listener(state));

  return {
    add(product) {
      state.items.push(product);
      notify();
    },
    remove(productId) {
      state.items = state.items.filter((item) => item.id !== productId);
      notify();
    },
    total() {
      return state.items.reduce((sum, item) => sum + item.price, 0);
    },
    count() {
      return state.items.length;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}