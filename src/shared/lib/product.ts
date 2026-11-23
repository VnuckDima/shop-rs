export type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);