import { getLocale } from "./i18n";

export type ProductSpec = {
  label: string;
  value: string;
  labelEn?: string;
  valueEn?: string;
};

export type Product = {
  id: number;
  title: string;
  titleEn?: string;
  price: number;
  oldPrice?: number;
  category: string;
  brand?: string;
  rating: number;
  imageUrl: string;
  badge?: "hit" | "new" | "sale";
  description?: string;
  descriptionEn?: string;
  specs?: ProductSpec[];
};

export function productTitle(product: Product): string {
  return getLocale() === "en" && product.titleEn
    ? product.titleEn
    : product.title;
}

export function productDescription(product: Product): string | undefined {
  return getLocale() === "en" && product.descriptionEn
    ? product.descriptionEn
    : product.description;
}

export function specLabel(spec: ProductSpec): string {
  return getLocale() === "en" && spec.labelEn ? spec.labelEn : spec.label;
}

export function specValue(spec: ProductSpec): string {
  return getLocale() === "en" && spec.valueEn ? spec.valueEn : spec.value;
}

export const calcDiscount = (product: Product): number =>
  product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat(getLocale() === "en" ? "en-US" : "ru-RU", {
    style: "currency",
    currency: "RUB",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);