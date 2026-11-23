import type { Product } from "@entities/Product";
import type { ProductSpec } from "@shared/lib/product";

export const CATEGORIES = [
  "Все",
  "Смартфоны",
  "Ноутбуки",
  "Аудио",
  "Аксессуары",
] as const;

const specsByCategory: Record<string, ProductSpec[]> = {
  Смартфоны: [
    { label: "Экран", value: '6.5" AMOLED, 120 Гц' },
    { label: "Процессор", value: "Octa-core 2.8 ГГц" },
    { label: "Память", value: "8 ГБ / 256 ГБ" },
    { label: "Камера", value: "50 МП + 12 МП" },
    { label: "Аккумулятор", value: "5000 мА·ч" },
  ],
  Ноутбуки: [
    { label: "Экран", value: '14" IPS, 2K' },
    { label: "Процессор", value: "Intel Core i7" },
    { label: "ОЗУ", value: "16 ГБ LPDDR5" },
    { label: "Накопитель", value: "SSD 1 ТБ" },
    { label: "Вес", value: "1.2 кг" },
  ],
  Аудио: [
    { label: "Тип", value: "Беспроводные" },
    { label: "Bluetooth", value: "5.3" },
    { label: "Автономность", value: "до 40 часов" },
    { label: "Шумоподавление", value: "Активное (ANC)" },
    { label: "Вес", value: "250 г" },
  ],
  Аксессуары: [
    { label: "Тип подключения", value: "USB / Bluetooth" },
    { label: "Материал", value: "Пластик, металл" },
    { label: "Подсветка", value: "RGB" },
    { label: "Совместимость", value: "Windows / macOS" },
    { label: "Гарантия", value: "24 месяца" },
  ],
};

const description =
  "Качественная техника по выгодной цене. Проверено временем и тысячами покупателей.";

const withSpecs = (product: Omit<Product, "specs" | "description">): Product => ({
  ...product,
  description,
  specs: specsByCategory[product.category] ?? [],
});

const RAW_PRODUCTS: Omit<Product, "specs" | "description">[] = [
  {
    id: 1,
    title: "Смартфон Nova X 256 ГБ",
    price: 42990,
    oldPrice: 49990,
    category: "Смартфоны",
    brand: "Samsung",
    rating: 4.8,
    imageUrl: "/img/phone.jpg",
    badge: "hit",
  },
  {
    id: 2,
    title: "Ноутбук AeroBook Pro 14",
    price: 84990,
    category: "Ноутбуки",
    brand: "ASUS",
    rating: 4.9,
    imageUrl: "/img/laptop.jpg",
    badge: "new",
  },
  {
    id: 3,
    title: "Наушники SoundAir Max",
    price: 14990,
    oldPrice: 18990,
    category: "Аудио",
    brand: "Sony",
    rating: 4.7,
    imageUrl: "/img/headphones.jpg",
    badge: "sale",
  },
  {
    id: 4,
    title: "Клавиатура Mechanic K1",
    price: 8490,
    category: "Аксессуары",
    brand: "Logitech",
    rating: 4.6,
    imageUrl: "/img/keyboard.jpg",
  },
  {
    id: 5,
    title: 'Монитор Vision 27" 4K',
    price: 34990,
    oldPrice: 39990,
    category: "Аксессуары",
    brand: "Samsung",
    rating: 4.8,
    imageUrl: "/img/monitor.jpg",
    badge: "sale",
  },
  {
    id: 6,
    title: "Мышь Glide Pro",
    price: 3290,
    category: "Аксессуары",
    brand: "Logitech",
    rating: 4.5,
    imageUrl: "/img/mouse.jpg",
  },
  {
    id: 7,
    title: "Смартфон Nova Mini 128 ГБ",
    price: 32990,
    category: "Смартфоны",
    brand: "Xiaomi",
    rating: 4.4,
    imageUrl: "/img/phone-2.jpg",
    badge: "new",
  },
  {
    id: 8,
    title: "Колонка BeatBox Mini",
    price: 5990,
    oldPrice: 7990,
    category: "Аудио",
    brand: "JBL",
    rating: 4.3,
    imageUrl: "/img/speaker.jpg",
    badge: "sale",
  },
];

export const MOCK_PRODUCTS: Product[] = RAW_PRODUCTS.map(withSpecs);