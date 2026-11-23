import { ProductCard, type Product } from "@entities/Product";
import "./ui/ProductList.css";

export type ProductListProps = {
  products: Product[];
  onAddToCart?: (product: Product) => void;
};

export function ProductList({
  products,
  onAddToCart,
}: ProductListProps): HTMLElement {
  const list = document.createElement("section");
  list.className = "product-list";

  for (const product of products) {
    list.appendChild(ProductCard(product, onAddToCart));
  }

  return list;
}