import type { Product } from "@shared/lib/product";
import { formatPrice } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import "./ui/ProductCard.css";

export type { Product };

export function ProductCard(
  product: Product,
  onAddToCart?: (product: Product) => void,
): HTMLElement {
  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
    <img class="product-card__image" src="${product.imageUrl}" alt="${product.title}" loading="lazy" />
    <div class="product-card__body">
      <h3 class="product-card__title">${product.title}</h3>
      <span class="product-card__price">${formatPrice(product.price)}</span>
    </div>
  `;

  card
    .querySelector(".product-card__body")
    ?.appendChild(
      Button("В корзину", () => onAddToCart?.(product)),
    );

  return card;
}