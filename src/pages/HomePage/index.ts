import type { Product } from "@entities/Product";
import { ProductList } from "@widgets/ProductList";
import { formatPrice } from "@shared/lib/product";
import "./ui/HomePage.css";

export type HomePageProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  total: number;
};

export function HomePage({
  products,
  onAddToCart,
  total,
}: HomePageProps): HTMLElement {
  const page = document.createElement("main");
  page.className = "home";

  const inner = document.createElement("div");
  inner.className = "home__inner";

  const hero = document.createElement("section");
  hero.className = "home__hero";
  hero.innerHTML = `
    <h1 class="home__title">Интернет-магазин Shop-RS</h1>
    <p class="home__subtitle">Итого в корзине: <strong data-cart-total>${formatPrice(
      total,
    )}</strong></p>
  `;

  inner.append(hero, ProductList({ products, onAddToCart }));
  page.appendChild(inner);

  return page;
}

export function updateCartTotal(root: HTMLElement, total: number): void {
  const el = root.querySelector<HTMLElement>("[data-cart-total]");
  if (el) el.textContent = formatPrice(total);
}