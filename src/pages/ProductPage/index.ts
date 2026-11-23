import type { CartApi } from "@features/cart";
import type { Product } from "@shared/lib/product";
import { formatPrice } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
import "./ui/ProductPage.css";

export type ProductPageProps = {
  product: Product;
  cart: CartApi;
  onBack?: () => void;
};

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  hit: "Хит",
  new: "Новинка",
  sale: "Скидка",
};

export function ProductPage({
  product,
  cart,
  onBack,
}: ProductPageProps): HTMLElement {
  const back = el(
    "button",
    { type: "button", class: "product-page__back" },
    "← Назад",
  );
  back.addEventListener("click", () => onBack?.());

  const controls = el("div", { class: "product-page__controls" });

  const renderControls = () => {
    const qty =
      cart.lines().find((line) => line.product.id === product.id)?.qty ?? 0;
    controls.replaceChildren();

    if (qty <= 0) {
      controls.appendChild(
        Button({
          label: "В корзину",
          onClick: () => cart.add(product),
        }),
      );
      return;
    }

    const group = el(
      "div",
      { class: "product-page__qty" },
      el("button", {
        type: "button",
        class: "product-page__qty-btn",
        "aria-label": "Уменьшить количество",
        text: "−",
      }),
      el("span", { class: "product-page__qty-count", text: String(qty) }),
      el("button", {
        type: "button",
        class: "product-page__qty-btn",
        "aria-label": "Увеличить количество",
        text: "+",
      }),
    );

    const [minus, plus] = group.querySelectorAll<HTMLButtonElement>(
      ".product-page__qty-btn",
    );
    minus?.addEventListener("click", () => cart.dec(product.id));
    plus?.addEventListener("click", () => cart.inc(product.id));

    controls.append(
      group,
      Button({
        label: "Удалить",
        variant: "ghost",
        onClick: () => cart.remove(product.id),
      }),
      Button({
        label: "Купить в 1 клик",
        variant: "ghost",
        onClick: () => {
          cart.add(product);
          onBack?.();
        },
      }),
    );
  };

  const unsubscribe = cart.subscribe(() => {
    renderControls();
    if (!controls.isConnected) unsubscribe();
  });
  renderControls();

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const prices = el(
    "div",
    { class: "product-page__prices" },
    el("span", { class: "product-page__price", text: formatPrice(product.price) }),
    product.oldPrice
      ? el("span", {
          class: "product-page__oldprice",
          text: formatPrice(product.oldPrice),
        })
      : "",
    discount
      ? el("span", { class: "product-page__discount", text: `−${discount}%` })
      : "",
  );

  const specs = el(
    "ul",
    { class: "product-page__specs" },
    ...(product.specs ?? []).map((spec) =>
      el(
        "li",
        { class: "product-page__spec" },
        el("span", { class: "product-page__spec-label", text: spec.label }),
        el("span", { class: "product-page__spec-value", text: spec.value }),
      ),
    ),
  );

  const info = el(
    "div",
    { class: "product-page__info" },
    el("span", { class: "product-page__category", text: product.category }),
    el("h1", { class: "product-page__title", text: product.title }),
    el(
      "div",
      { class: "product-page__rating" },
      el("span", { class: "product-page__star", text: "★" }),
      ` ${product.rating.toFixed(1)} `,
      el("span", { class: "product-page__muted", text: "· рейтинг покупателей" }),
    ),
    el("p", {
      class: "product-page__description",
      text:
        product.description ?? "Подробное описание скоро появится.",
    }),
    prices,
    el("h3", { class: "product-page__specs-title", text: "Характеристики" }),
    specs,
    controls,
  );

  const media = el(
    "div",
    { class: "product-page__media" },
    el("img", {
      class: "product-page__image",
      src: product.imageUrl,
      alt: product.title,
    }),
    product.badge
      ? el("span", {
          class: `product-page__badge product-page__badge--${product.badge}`,
          text: BADGE_LABEL[product.badge],
        })
      : "",
  );

  return el(
    "main",
    { class: "product-page" },
    el(
      "div",
      { class: "product-page__inner container" },
      back,
      el("div", { class: "product-page__layout" }, media, info),
    ),
  );
}