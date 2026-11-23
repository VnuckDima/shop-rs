import type { Product } from "@shared/lib/product";
import {
  formatPrice,
  productTitle,
} from "@shared/lib/product";
import { categoryLabel, t } from "@shared/lib/i18n";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
import "./ui/ProductCard.css";

export type { Product };

const BADGE_LABEL_KEY: Record<NonNullable<Product["badge"]>, string> = {
  hit: "product.badge.hit",
  new: "product.badge.new",
  sale: "product.badge.sale",
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
      alt: productTitle(product),
      loading: "lazy",
    }),
    product.badge
      ? el("span", {
          class: `product-card__badge product-card__badge--${product.badge}`,
          text: t(BADGE_LABEL_KEY[product.badge]),
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
    el("span", { class: "product-card__category", text: categoryLabel(product.category) }),
    el("h3", { class: "product-card__title", "data-open": "", text: productTitle(product) }),
    el(
      "div",
      {
        class: "product-card__rating",
        "aria-label": t("product.rating.aria", { rating: product.rating }),
      },
      el("span", { class: "product-card__star", text: "★" }),
      ` ${product.rating.toFixed(1)}`,
    ),
    prices,
  );

  const footer = el(
    "div",
    { class: "product-card__footer" },
    Button({
      label: t("product.card.more"),
      variant: "ghost",
      onClick: () => handlers.onOpen?.(product),
    }),
    Button({
      label: t("product.card.add"),
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