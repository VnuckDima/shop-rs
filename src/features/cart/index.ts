import type { Product } from "@entities/Product";

export type CartLine = {
  product: Product;
  qty: number;
};

export type CartState = {
  lines: CartLine[];
};

export type CartApi = {
  add: (product: Product, qty?: number) => void;
  setQty: (productId: number, qty: number) => void;
  inc: (productId: number) => void;
  dec: (productId: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
  lines: () => CartLine[];
  subscribe: (listener: (state: CartState) => void) => () => void;
};

export function createCart(): CartApi {
  const state: CartState = { lines: [] };
  const listeners = new Set<(state: CartState) => void>();

  const notify = () => listeners.forEach((listener) => listener(state));

  const findIndex = (productId: number): number =>
    state.lines.findIndex((line) => line.product.id === productId);

  return {
    add(product, qty = 1) {
      const index = findIndex(product.id);
      if (index >= 0) {
        state.lines[index].qty += qty;
      } else {
        state.lines.push({ product, qty });
      }
      notify();
    },

    setQty(productId, qty) {
      const index = findIndex(productId);
      if (index < 0) return;
      if (qty <= 0) {
        state.lines.splice(index, 1);
      } else {
        state.lines[index].qty = qty;
      }
      notify();
    },

    inc(productId) {
      const line = state.lines.find((item) => item.product.id === productId);
      if (line) {
        line.qty += 1;
        notify();
      }
    },

    dec(productId) {
      const line = state.lines.find((item) => item.product.id === productId);
      if (!line) return;
      line.qty -= 1;
      if (line.qty <= 0) {
        state.lines = state.lines.filter(
          (item) => item.product.id !== productId,
        );
      }
      notify();
    },

    remove(productId) {
      state.lines = state.lines.filter(
        (item) => item.product.id !== productId,
      );
      notify();
    },

    clear() {
      state.lines = [];
      notify();
    },

    total() {
      return state.lines.reduce(
        (sum, line) => sum + line.product.price * line.qty,
        0,
      );
    },

    count() {
      return state.lines.reduce((sum, line) => sum + line.qty, 0);
    },

    lines() {
      return state.lines;
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}