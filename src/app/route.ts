import { STORAGE_KEYS } from "@shared/constants/storage";
import { isBenefitKey, type BenefitKey } from "@shared/lib/benefits";
import type { Product } from "@shared/lib/product";

export type Route =
  | { name: "about" }
  | { name: "home" }
  | { name: "brand"; brand: string }
  | { name: "product"; product: Product; back: Route }
  | { name: "info"; key: BenefitKey; back: Route };

type RouteDescriptor =
  | { name: "about" }
  | { name: "home" }
  | { name: "brand"; brand: string }
  | { name: "product"; productId: number; back: RouteDescriptor }
  | { name: "info"; key: BenefitKey; back: RouteDescriptor };

export function serializeRoute(route: Route): RouteDescriptor {
  if (route.name === "product") {
    return {
      name: "product",
      productId: route.product.id,
      back: serializeRoute(route.back),
    };
  }
  if (route.name === "info") {
    return { name: "info", key: route.key, back: serializeRoute(route.back) };
  }
  if (route.name === "brand") {
    return { name: "brand", brand: route.brand };
  }
  return { name: route.name };
}

export function deserializeRoute(
  value: unknown,
  products: Product[],
): Route | null {
  if (!value || typeof value !== "object") return null;

  const data = value as {
    name?: unknown;
    brand?: unknown;
    productId?: unknown;
    key?: unknown;
    back?: unknown;
  };

  switch (data.name) {
    case "about":
      return { name: "about" };
    case "home":
      return { name: "home" };
    case "brand":
      return typeof data.brand === "string"
        ? { name: "brand", brand: data.brand }
        : null;
    case "product": {
      const product = products.find((item) => item.id === data.productId);
      if (!product) return null;
      const back = deserializeRoute(data.back, products);
      return back ? { name: "product", product, back } : null;
    }
    case "info": {
      if (!isBenefitKey(data.key)) return null;
      const back = deserializeRoute(data.back, products);
      return back ? { name: "info", key: data.key, back } : null;
    }
    default:
      return null;
  }
}

export function loadRoute(products: Product[]): Route | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.route);
    if (!raw) return null;
    return deserializeRoute(JSON.parse(raw), products);
  } catch (err) {
    console.warn("Failed to load route", err);
    return null;
  }
}

export function saveRoute(route: Route): void {
  try {
    sessionStorage.setItem(STORAGE_KEYS.route, JSON.stringify(serializeRoute(route)));
  } catch (err) {
    console.warn("Failed to save route", err);
  }
}