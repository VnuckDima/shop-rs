import { describe, expect, it } from "vitest";
import { filterProducts } from "./catalog";
import type { Product } from "./product";

const products: Product[] = [
  {
    id: 1,
    title: "Смартфон Nova",
    price: 100,
    category: "Смартфоны",
    rating: 4.8,
    imageUrl: "",
    badge: "new",
  },
  {
    id: 2,
    title: "Ноутбук Aero",
    price: 200,
    category: "Ноутбуки",
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: 3,
    title: "Наушники Sound",
    price: 50,
    category: "Аудио",
    rating: 4.7,
    imageUrl: "",
    badge: "sale",
  },
  {
    id: 4,
    title: "Смартфон Mini",
    price: 80,
    category: "Смартфоны",
    rating: 4.4,
    imageUrl: "",
    badge: "sale",
  },
];

describe("filterProducts", () => {
  it("без фильтров возвращает все товары", () => {
    expect(filterProducts(products)).toHaveLength(4);
  });

  it("фильтрует по категории", () => {
    const result = filterProducts(products, { category: "Смартфоны" });
    expect(result.map((p) => p.id)).toEqual([1, 4]);
  });

  it("фильтрует по запросу без учёта регистра", () => {
    const result = filterProducts(products, { query: "ноут" });
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it("фильтрует по бейджу new", () => {
    const result = filterProducts(products, { tag: "new" });
    expect(result.map((p) => p.id)).toEqual([1]);
  });

  it("фильтрует по бейджу sale", () => {
    const result = filterProducts(products, { tag: "sale" });
    expect(result.map((p) => p.id)).toEqual([3, 4]);
  });

  it("комбинирует категорию и бейдж", () => {
    const result = filterProducts(products, {
      category: "Смартфоны",
      tag: "sale",
    });
    expect(result.map((p) => p.id)).toEqual([4]);
  });

  it("пустой результат, если ничего не подходит", () => {
    expect(filterProducts(products, { query: "нет такого" })).toEqual([]);
  });
});