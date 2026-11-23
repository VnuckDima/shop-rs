import { ProductCard, type Product } from "@entities/Product";
import { el } from "@shared/lib/dom";
import { t } from "@shared/lib/i18n";
import "./ui/ProductList.css";

export type ProductListProps = {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onOpen?: (product: Product) => void;
};

export function ProductList({
  products,
  onAddToCart,
  onOpen,
}: ProductListProps): HTMLElement {
  const list = document.createElement("section");
  list.className = "product-list";

  if (products.length === 0) {
    list.classList.add("product-list--empty");
    const empty = el(
      "div",
      { class: "product-list__empty" },
      el("span", { class: "product-list__empty-icon", text: "🔍" }),
      el("p", { text: t("product.list.empty") }),
    );
    list.appendChild(empty);
    return list;
  }

  for (const product of products) {
    list.appendChild(ProductCard(product, { onAddToCart, onOpen }));
  }

  return list;
}