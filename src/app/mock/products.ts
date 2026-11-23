import type { Product } from "@entities/Product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Наушники беспроводные",
    price: 5990,
    imageUrl: "https://picsum.photos/seed/headphones/480/360",
  },
  {
    id: 2,
    title: "Смартфон",
    price: 42990,
    imageUrl: "https://picsum.photos/seed/phone/480/360",
  },
  {
    id: 3,
    title: "Ноутбук",
    price: 74990,
    imageUrl: "https://picsum.photos/seed/laptop/480/360",
  },
  {
    id: 4,
    title: "Клавиатура механическая",
    price: 8490,
    imageUrl: "https://picsum.photos/seed/keyboard/480/360",
  },
  {
    id: 5,
    title: "Монитор 27\"",
    price: 24990,
    imageUrl: "https://picsum.photos/seed/monitor/480/360",
  },
  {
    id: 6,
    title: "Мышь игровая",
    price: 3290,
    imageUrl: "https://picsum.photos/seed/mouse/480/360",
  },
];