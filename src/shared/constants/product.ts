import type { Product } from "@shared/lib/product";

export const BADGE_LABEL_KEY: Record<NonNullable<Product["badge"]>, string> = {
  hit: "product.badge.hit",
  new: "product.badge.new",
  sale: "product.badge.sale",
};