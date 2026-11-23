import type { Product } from "@entities/Product";
import type { ProductSpec } from "@shared/lib/product";

const specsByCategory: Record<string, ProductSpec[]> = {
  Смартфоны: [
    {
      label: "Экран",
      value: '6.5" AMOLED, 120 Гц',
      labelEn: "Screen",
      valueEn: '6.5" AMOLED, 120 Hz',
    },
    {
      label: "Процессор",
      value: "Octa-core 2.8 ГГц",
      labelEn: "Processor",
      valueEn: "Octa-core 2.8 GHz",
    },
    {
      label: "Память",
      value: "8 ГБ / 256 ГБ",
      labelEn: "Memory",
      valueEn: "8 GB / 256 GB",
    },
    {
      label: "Камера",
      value: "50 МП + 12 МП",
      labelEn: "Camera",
      valueEn: "50 MP + 12 MP",
    },
    {
      label: "Аккумулятор",
      value: "5000 мА·ч",
      labelEn: "Battery",
      valueEn: "5000 mAh",
    },
  ],
  Ноутбуки: [
    {
      label: "Экран",
      value: '14" IPS, 2K',
      labelEn: "Screen",
      valueEn: '14" IPS, 2K',
    },
    {
      label: "Процессор",
      value: "Intel Core i7",
      labelEn: "Processor",
      valueEn: "Intel Core i7",
    },
    {
      label: "ОЗУ",
      value: "16 ГБ LPDDR5",
      labelEn: "RAM",
      valueEn: "16 GB LPDDR5",
    },
    {
      label: "Накопитель",
      value: "SSD 1 ТБ",
      labelEn: "Storage",
      valueEn: "1 TB SSD",
    },
    {
      label: "Вес",
      value: "1.2 кг",
      labelEn: "Weight",
      valueEn: "1.2 kg",
    },
  ],
  Аудио: [
    {
      label: "Тип",
      value: "Беспроводные",
      labelEn: "Type",
      valueEn: "Wireless",
    },
    {
      label: "Bluetooth",
      value: "5.3",
      labelEn: "Bluetooth",
      valueEn: "5.3",
    },
    {
      label: "Автономность",
      value: "до 40 часов",
      labelEn: "Battery life",
      valueEn: "up to 40 hours",
    },
    {
      label: "Шумоподавление",
      value: "Активное (ANC)",
      labelEn: "Noise cancellation",
      valueEn: "Active (ANC)",
    },
    {
      label: "Вес",
      value: "250 г",
      labelEn: "Weight",
      valueEn: "250 g",
    },
  ],
  Аксессуары: [
    {
      label: "Тип подключения",
      value: "USB / Bluetooth",
      labelEn: "Connection",
      valueEn: "USB / Bluetooth",
    },
    {
      label: "Материал",
      value: "Пластик, металл",
      labelEn: "Material",
      valueEn: "Plastic, metal",
    },
    {
      label: "Подсветка",
      value: "RGB",
      labelEn: "Backlight",
      valueEn: "RGB",
    },
    {
      label: "Совместимость",
      value: "Windows / macOS",
      labelEn: "Compatibility",
      valueEn: "Windows / macOS",
    },
    {
      label: "Гарантия",
      value: "24 месяца",
      labelEn: "Warranty",
      valueEn: "24 months",
    },
  ],
};

const description =
  "Качественная техника по выгодной цене. Проверено временем и тысячами покупателей.";
const descriptionEn =
  "Quality technology at a great price. Tested by time and thousands of customers.";

const withSpecs = (
  product: Omit<Product, "specs" | "description" | "descriptionEn">,
): Product => ({
  ...product,
  description,
  descriptionEn,
  specs: specsByCategory[product.category] ?? [],
});

const RAW_PRODUCTS: Omit<
  Product,
  "specs" | "description" | "descriptionEn"
>[] = [
  {
    id: 1,
    title: "Смартфон Nova X 256 ГБ",
    titleEn: "Nova X Smartphone 256 GB",
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
    titleEn: "AeroBook Pro 14 Laptop",
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
    titleEn: "SoundAir Max Headphones",
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
    titleEn: "Mechanic K1 Keyboard",
    price: 8490,
    category: "Аксессуары",
    brand: "Logitech",
    rating: 4.6,
    imageUrl: "/img/keyboard.jpg",
  },
  {
    id: 5,
    title: 'Монитор Vision 27" 4K',
    titleEn: 'Vision 27" 4K Monitor',
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
    titleEn: "Glide Pro Mouse",
    price: 3290,
    category: "Аксессуары",
    brand: "Logitech",
    rating: 4.5,
    imageUrl: "/img/mouse.jpg",
  },
  {
    id: 7,
    title: "Смартфон Nova Mini 128 ГБ",
    titleEn: "Nova Mini Smartphone 128 GB",
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
    titleEn: "BeatBox Mini Speaker",
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