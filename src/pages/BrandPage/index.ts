import type { Product } from "@entities/Product";
import { ProductList } from "@widgets/ProductList";
import { filterProducts } from "@shared/lib/catalog";
import { pluralSuffix, t } from "@shared/lib/i18n";
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
    t("brand.back"),
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
        el("span", {
          class: "brand-page__count",
          text: t(`brand.count.${pluralSuffix(count)}`, { count }),
        }),
      ),
      ProductList({ products: filtered, onAddToCart, onOpen }),
    ),
  );

  return page;
}