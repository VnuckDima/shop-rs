export const STORAGE_KEYS = {
  theme: "shop-rs:theme",
  locale: "shop-rs:locale",
  route: "shop-rs:route",
  cart: "shop-rs:cart",
  favorites: "shop-rs:favorites",
  products: "shop-rs:products:v1",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];