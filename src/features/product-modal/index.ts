import type { CartApi } from "@features/cart";
import type { Product } from "@shared/lib/product";
import { formatPrice } from "@shared/lib/product";
import { Button } from "@shared/ui/Button";
import { el } from "@shared/lib/dom";
import "./ui/ProductModal.css";

export type ProductModalApi = {
  root: HTMLElement;
  open: (product: Product) => void;
  close: () => void;
};

export type ProductModalOptions = {
  onAddToCart?: (product: Product) => void;
  cart?: CartApi;
};

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  hit: "Хит",
  new: "Новинка",
  sale: "Скидка",
};

export function createProductModal({
  onAddToCart,
  cart,
}: ProductModalOptions = {}): ProductModalApi {
  const overlay = el("div", { class: "modal", hidden: "" });

  const backdrop = el("div", { class: "modal__backdrop", "data-close": "" });
  const closeButton = el("button", {
    type: "button",
    class: "modal__close",
    "data-close": "",
    "aria-label": "Закрыть",
    text: "✕",
  });

  const image = el("img", { class: "modal__image", alt: "" });
  const badge = el("span", { class: "modal__badge", hidden: "" });

  const category = el("span", { class: "modal__category" });
  const title = el("h2", { class: "modal__title", id: "modal-title" });
  const rating = el("div", { class: "modal__rating" });
  const description = el("p", { class: "modal__description" });
  const specs = el("ul", { class: "modal__specs" });
  const prices = el("div", { class: "modal__prices" });
  const addSlot = el("div", { class: "modal__add" });

  const dialog = el(
    "div",
    {
      class: "modal__dialog",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "modal-title",
    },
    closeButton,
    el("div", { class: "modal__media" }, image, badge),
    el(
      "div",
      { class: "modal__content" },
      category,
      title,
      rating,
      description,
      el("h3", { class: "modal__specs-title", text: "Характеристики" }),
      specs,
      prices,
      el("div", { class: "modal__actions" }, addSlot),
    ),
  );

  overlay.append(backdrop, dialog);

  let lastFocused: HTMLElement | null = null;
  let currentProduct: Product | null = null;

  const currentQty = (): number => {
    if (!cart || !currentProduct) return 0;
    return (
      cart.lines().find((line) => line.product.id === currentProduct!.id)?.qty ??
      0
    );
  };

  const renderAddControls = () => {
    addSlot.replaceChildren();
    const qty = currentQty();

    if (qty <= 0 || !cart || !currentProduct) {
      addSlot.appendChild(
        Button({
          label: "В корзину",
          onClick: () => {
            if (currentProduct) onAddToCart?.(currentProduct);
          },
        }),
      );
      return;
    }

    const productId = currentProduct.id;

    const group = el(
      "div",
      { class: "modal__qty" },
      el("button", {
        type: "button",
        class: "modal__qty-btn",
        "aria-label": "Уменьшить количество",
        text: "−",
      }),
      el("span", { class: "modal__qty-count", text: String(qty) }),
      el("button", {
        type: "button",
        class: "modal__qty-btn",
        "aria-label": "Увеличить количество",
        text: "+",
      }),
    );

    const [minusBtn, plusBtn] = group.querySelectorAll<HTMLButtonElement>(
      ".modal__qty-btn",
    );
    minusBtn?.addEventListener("click", () => cart?.dec(productId));
    plusBtn?.addEventListener("click", () => cart?.inc(productId));

    addSlot.append(
      group,
      Button({
        label: "Удалить",
        variant: "ghost",
        onClick: () => cart?.remove(productId),
      }),
    );
  };

  if (cart) cart.subscribe(renderAddControls);

  const close = () => {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
    currentProduct = null;
    lastFocused?.focus();
  };

  dialog
    .querySelector(".modal__actions")
    ?.appendChild(
      Button({
        label: "Купить в 1 клик",
        variant: "ghost",
        onClick: () => {
          if (currentProduct) onAddToCart?.(currentProduct);
          close();
        },
      }),
    );

  const open = (product: Product) => {
    lastFocused = document.activeElement as HTMLElement | null;
    currentProduct = product;

    image.src = product.imageUrl;
    image.alt = product.title;
    category.textContent = product.category;
    title.textContent = product.title;
    rating.replaceChildren(
      el("span", { class: "modal__star", text: "★" }),
      ` ${product.rating.toFixed(1)} `,
      el("span", {
        class: "modal__muted",
        text: "· рейтинг покупателей",
      }),
    );
    description.textContent =
      product.description ?? "Подробное описание скоро появится.";

    badge.hidden = !product.badge;
    if (product.badge) {
      badge.textContent = BADGE_LABEL[product.badge];
      badge.className = `modal__badge modal__badge--${product.badge}`;
    }

    specs.replaceChildren(
      ...(product.specs ?? []).map((spec) =>
        el(
          "li",
          { class: "modal__spec" },
          el("span", { class: "modal__spec-label", text: spec.label }),
          el("span", { class: "modal__spec-value", text: spec.value }),
        ),
      ),
    );

    const discount = product.oldPrice
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : 0;

    const priceChildren: (Node | string)[] = [
      el("span", { class: "modal__price", text: formatPrice(product.price) }),
    ];
    if (product.oldPrice) {
      priceChildren.push(
        el("span", {
          class: "modal__oldprice",
          text: formatPrice(product.oldPrice),
        }),
      );
    }
    if (discount) {
      priceChildren.push(
        el("span", { class: "modal__discount", text: `−${discount}%` }),
      );
    }
    prices.replaceChildren(...priceChildren);

    renderAddControls();

    overlay.hidden = false;
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  overlay.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) close();
  });

  return { root: overlay, open, close };
}