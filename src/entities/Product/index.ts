import type { Product } from "@shared/lib/product";
import { formatPrice } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import "./ui/ProductCard.css";

export type { Product };

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  hit: "Хит",
  new: "Новинка",
  sale: "Скидка",
};

export type ProductCardHandlers = {
  onAddToCart?: (product: Product) => void;
  onOpen?: (product: Product) => void;
};

export function ProductCard(
  product: Product,
  handlers: ProductCardHandlers = {},
): HTMLElement {
  const card = document.createElement("article");
  card.className = "product-card";

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  card.innerHTML = `
    <div class="product-card__media" data-open>
      <img class="product-card__image" src="${product.imageUrl}" alt="${product.title}" loading="lazy" />
      ${
        product.badge
          ? `<span class="product-card__badge product-card__badge--${product.badge}">${
              BADGE_LABEL[product.badge]
            }</span>`
          : ""
      }
    </div>
    <div class="product-card__body">
      <span class="product-card__category">${product.category}</span>
      <h3 class="product-card__title" data-open>${product.title}</h3>
      <div class="product-card__rating" aria-label="Рейтинг ${product.rating}">
        <span class="product-card__star">★</span> ${product.rating.toFixed(1)}
      </div>
      <div class="product-card__prices">
        <span class="product-card__price">${formatPrice(product.price)}</span>
        ${
          product.oldPrice
            ? `<span class="product-card__oldprice">${formatPrice(
                product.oldPrice,
              )}</span>`
            : ""
        }
        ${discount ? `<span class="product-card__discount">−${discount}%</span>` : ""}
      </div>
    </div>
    <div class="product-card__footer"></div>
  `;

  card
    .querySelectorAll<HTMLElement>("[data-open]")
    .forEach((el) =>
      el.addEventListener("click", () => handlers.onOpen?.(product)),
    );

  card
    .querySelector(".product-card__footer")
    ?.append(
      Button({
        label: "Подробнее",
        variant: "ghost",
        onClick: () => handlers.onOpen?.(product),
      }),
      Button({
        label: "В корзину",
        onClick: () => handlers.onAddToCart?.(product),
      }),
    );

  return card;
}