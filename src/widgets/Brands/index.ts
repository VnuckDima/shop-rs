import { el } from "@shared/lib/dom";
import { t } from "@shared/lib/i18n";
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

export type BrandsProps = {
  onSelect?: (brand: string) => void;
};

export function Brands({ onSelect }: BrandsProps = {}): HTMLElement {
  const grid = el(
    "div",
    { class: "brands__grid" },
    ...BRANDS.map((brand) =>
      el(
        "button",
        { type: "button", class: "brands__item", "data-brand": brand },
        brand,
      ),
    ),
  );

  grid.querySelectorAll<HTMLButtonElement>("[data-brand]").forEach((item) => {
    item.addEventListener("click", () => {
      if (item.dataset.brand) onSelect?.(item.dataset.brand);
    });
  });

  return el(
    "section",
    { class: "brands", id: "brands" },
    el(
      "div",
      { class: "brands__inner container" },
      el("h2", { class: "brands__title", text: t("brands.title") }),
      grid,
    ),
  );
}