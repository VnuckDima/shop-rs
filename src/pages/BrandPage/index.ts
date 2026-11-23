import type { Product } from "@entities/Product";
import { ProductList } from "@widgets/ProductList";
import { filterProducts } from "@shared/lib/catalog";
import { el } from "@shared/lib/dom";
import "./ui/BrandPage.css";

export type BrandPageProps = {
  brand: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpen: (product: Product) => void;
  onBack?: () => void;
};

export function BrandPage({
  brand,
  products,
  onAddToCart,
  onOpen,
  onBack,
}: BrandPageProps): HTMLElement {
  const back = el(
    "button",
    { type: "button", class: "brand-page__back" },
    "← Назад в каталог",
  );
  back.addEventListener("click", () => onBack?.());

  const filtered = filterProducts(products, { brand });
  const count = filtered.length;

  const page = el(
    "main",
    { class: "brand-page" },
    el(
      "div",
      { class: "brand-page__inner container" },
      back,
      el(
        "div",
        { class: "brand-page__heading" },
        el("h1", { class: "brand-page__title", text: brand }),
        el("span", { class: "brand-page__count", text: `${count} товаров` }),
      ),
      ProductList({ products: filtered, onAddToCart, onOpen }),
    ),
  );

  return page;
}