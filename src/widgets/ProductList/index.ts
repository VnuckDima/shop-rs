import { ProductCard, type Product } from "@entities/Product";
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
    const empty = document.createElement("div");
    empty.className = "product-list__empty";
    empty.innerHTML = `
      <span class="product-list__empty-icon">🔍</span>
      <p>Ничего не найдено. Попробуйте изменить запрос или категорию.</p>
    `;
    list.appendChild(empty);
    return list;
  }

  for (const product of products) {
    list.appendChild(ProductCard(product, { onAddToCart, onOpen }));
  }

  return list;
}