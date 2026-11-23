import { el } from "@shared/lib/dom";
import "./ui/Brands.css";

const BRANDS = [
  "Apple",
  "Samsung",
  "Sony",
  "Xiaomi",
  "ASUS",
  "Lenovo",
  "JBL",
  "Logitech",
];

export function Brands(): HTMLElement {
  const grid = el(
    "div",
    { class: "brands__grid" },
    ...BRANDS.map((brand) =>
      el("span", { class: "brands__item", text: brand }),
    ),
  );

  return el(
    "section",
    { class: "brands", id: "brands" },
    el(
      "div",
      { class: "brands__inner container" },
      el("h2", { class: "brands__title", text: "Популярные бренды" }),
      grid,
    ),
  );
}