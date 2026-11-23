export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  imageUrl: string;
  badge?: "hit" | "new" | "sale";
  description?: string;
  specs?: ProductSpec[];
};

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);