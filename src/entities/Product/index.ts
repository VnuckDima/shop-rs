import type { Product } from "@shared/lib/product";
import { formatPrice } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
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
  const card = el("article", { class: "product-card" });

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const media = el(
    "div",
    { class: "product-card__media", "data-open": "" },
    el("img", {
      class: "product-card__image",
      src: product.imageUrl,
      alt: product.title,
      loading: "lazy",
    }),
    product.badge
      ? el("span", {
          class: `product-card__badge product-card__badge--${product.badge}`,
          text: BADGE_LABEL[product.badge],
        })
      : "",
  );

  const prices = el(
    "div",
    { class: "product-card__prices" },
    el("span", { class: "product-card__price", text: formatPrice(product.price) }),
    product.oldPrice
      ? el("span", {
          class: "product-card__oldprice",
          text: formatPrice(product.oldPrice),
        })
      : "",
    discount
      ? el("span", { class: "product-card__discount", text: `−${discount}%` })
      : "",
  );

  const body = el(
    "div",
    { class: "product-card__body" },
    el("span", { class: "product-card__category", text: product.category }),
    el("h3", { class: "product-card__title", "data-open": "", text: product.title }),
    el(
      "div",
      { class: "product-card__rating", "aria-label": `Рейтинг ${product.rating}` },
      el("span", { class: "product-card__star", text: "★" }),
      ` ${product.rating.toFixed(1)}`,
    ),
    prices,
  );

  const footer = el(
    "div",
    { class: "product-card__footer" },
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

  card.append(media, body, footer);

  card
    .querySelectorAll<HTMLElement>("[data-open]")
    .forEach((node) =>
      node.addEventListener("click", () => handlers.onOpen?.(product)),
    );

  return card;
}