import { BADGE_LABEL_KEY } from "@shared/constants/product";
import {
  calcDiscount,
  formatPrice,
  productTitle,
  type Product,
} from "@shared/lib/product";
import { categoryLabel, t } from "@shared/lib/i18n";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
import "./ui/ProductCard.css";

export type { Product };

export type ProductCardHandlers = {
  onAddToCart?: (product: Product) => void;
  onOpen?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: (product: Product) => boolean;
  isInCart?: (product: Product) => boolean;
};

export function ProductCard(
  product: Product,
  handlers: ProductCardHandlers = {},
): HTMLElement {
  const card = el("article", { class: "product-card" });

  const discount = calcDiscount(product);

  const favoriteButton = el("button", {
  type: "button",
  class: "product-card__favorite",
  "aria-label": "Добавить в избранное",
  "aria-pressed": "false",
  text: "♡",
});

const updateFavoriteButton = () => {
  const active = handlers.isFavorite?.(product) ?? false;

  favoriteButton.textContent = active ? "♥" : "♡";
  favoriteButton.classList.toggle(
    "product-card__favorite--active",
    active,
  );
  favoriteButton.setAttribute("aria-pressed", String(active));
  favoriteButton.setAttribute(
    "aria-label",
    active ? "Убрать из избранного" : "Добавить в избранное",
  );
};

updateFavoriteButton();

favoriteButton.addEventListener("click", (event) => {
  event.stopPropagation();
  handlers.onToggleFavorite?.(product);
  updateFavoriteButton();
});

  const media = el(
    "div",
    { class: "product-card__media", "data-open": "" },
    favoriteButton,
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

  const addButton = Button({
    label: handlers.isInCart?.(product)
      ? "В корзине"
      : t("product.card.add"),
    onClick: () => {
      handlers.onAddToCart?.(product);
    },
  });

  const footer = el(
    "div",
    { class: "product-card__footer" },
    Button({
      label: t("product.card.more"),
      variant: "ghost",
      onClick: () => handlers.onOpen?.(product),
    }),
    addButton,
  );

  card.append(media, body, footer);

  card
    .querySelectorAll<HTMLElement>("[data-open]")
    .forEach((node) =>
      node.addEventListener("click", () => handlers.onOpen?.(product)),
    );

  return card;
}